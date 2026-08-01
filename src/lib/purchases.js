import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";
import { monetizationDebug } from "./monetization-debug";

const removeAdsEntitlement =
  process.env.VITE_RC_REMOVE_ADS_ENTITLEMENT ?? "remove_ads";
let purchasesConfigurationPromise = null;

function debugPurchases(message, details = {}) {
  console.info("[RevenueCat]", message, details);
}

function getRevenueCatApiKey() {
  const platform = Capacitor.getPlatform();

  if (platform === "ios") {
    return process.env.VITE_RC_IOS_KEY ?? "";
  }

  if (platform === "android") {
    return process.env.VITE_RC_ANDROID_KEY ?? "";
  }

  return "";
}

export function canUseRevenueCat() {
  return (
    Capacitor.isNativePlatform() &&
    Capacitor.isPluginAvailable("Purchases") &&
    Boolean(getRevenueCatApiKey())
  );
}

export async function initializePurchases() {
  if (!canUseRevenueCat()) {
    debugPurchases("RevenueCat unavailable", {
      isNativePlatform: Capacitor.isNativePlatform(),
      pluginAvailable: Capacitor.isPluginAvailable("Purchases"),
      hasApiKey: Boolean(getRevenueCatApiKey()),
      platform: Capacitor.getPlatform(),
    });
    monetizationDebug(
      "RevenueCat unavailable",
      "RevenueCat plugin or API key is missing."
    );
    return false;
  }

  if (!purchasesConfigurationPromise) {
    debugPurchases("Configuring RevenueCat", {
      platform: Capacitor.getPlatform(),
      entitlement: removeAdsEntitlement,
    });
    purchasesConfigurationPromise = Purchases.configure({
      apiKey: getRevenueCatApiKey(),
    })
      .then(() => {
        debugPurchases("RevenueCat configured successfully");
        monetizationDebug(
          "RevenueCat configured",
          "RevenueCat initialized successfully."
        );
        return true;
      })
      .catch((error) => {
        console.warn("[RevenueCat] Configuration failed", error);
        monetizationDebug(
          "RevenueCat config failed",
          "RevenueCat failed to configure."
        );
        purchasesConfigurationPromise = null;
        return false;
      });
  }

  return purchasesConfigurationPromise;
}

function hasActiveRemoveAdsEntitlement(customerInfo) {
  return Boolean(
    customerInfo?.entitlements?.active?.[removeAdsEntitlement]?.isActive
  );
}

export async function userHasRemovedAds() {
  const isConfigured = await initializePurchases();

  if (!isConfigured) {
    debugPurchases("Assuming remove_ads is inactive because RevenueCat is not configured");
    return false;
  }

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const hasRemovedAds = hasActiveRemoveAdsEntitlement(customerInfo);
    debugPurchases("Customer info loaded", {
      hasRemovedAds,
      activeEntitlements: Object.keys(customerInfo?.entitlements?.active ?? {}),
    });
    if (hasRemovedAds) {
      monetizationDebug(
        "remove_ads active",
        "RevenueCat says ads are already removed on this account."
      );
    }
    return hasRemovedAds;
  } catch (error) {
    console.warn("[RevenueCat] Customer info lookup failed", error);
    monetizationDebug(
      "RevenueCat customer lookup failed",
      "Could not fetch customer info from RevenueCat."
    );
    return false;
  }
}

export async function loadRemoveAdsProduct() {
  const isConfigured = await initializePurchases();

  if (!isConfigured) {
    debugPurchases("Cannot load offerings because RevenueCat is not configured");
    return null;
  }

  const offerings = await Purchases.getOfferings();
  const defaultOffering =
    offerings.all?.default_v2 ??
    offerings.current ??
    offerings.all?.default ??
    null;

  debugPurchases("Offerings loaded", {
    currentOffering: offerings.current?.identifier ?? null,
    allOfferings: Object.keys(offerings.all ?? {}),
    defaultOfferingFound: Boolean(defaultOffering),
  });

  if (!defaultOffering) {
    return null;
  }

  const selectedProduct =
    defaultOffering.lifetime ??
    defaultOffering.availablePackages?.[0] ??
    null;

  debugPurchases("Selected remove ads package", {
    offeringIdentifier: defaultOffering.identifier ?? "default",
    hasLifetime: Boolean(defaultOffering.lifetime),
    packageCount: defaultOffering.availablePackages?.length ?? 0,
    foundProduct: Boolean(selectedProduct),
  });

  if (!selectedProduct) {
    monetizationDebug(
      "No remove ads product",
      "No purchasable product was found in the default RevenueCat offering."
    );
  }

  return selectedProduct;
}

export async function purchaseRemoveAds() {
  const selectedPackage = await loadRemoveAdsProduct();

  if (!selectedPackage) {
    debugPurchases("Remove ads product unavailable");
    monetizationDebug(
      "Purchase unavailable",
      "No remove ads product is available to buy."
    );
    const missingPackageError = new Error("REMOVE_ADS_PRODUCT_UNAVAILABLE");
    missingPackageError.code = "REMOVE_ADS_PRODUCT_UNAVAILABLE";
    throw missingPackageError;
  }

  debugPurchases("Starting remove ads purchase");
  const purchaseResult = await Purchases.purchasePackage({
    aPackage: selectedPackage,
  });

  return {
    package: selectedPackage,
    hasRemovedAds: hasActiveRemoveAdsEntitlement(purchaseResult.customerInfo),
  };
}

export async function restoreRemoveAdsPurchases() {
  const isConfigured = await initializePurchases();

  if (!isConfigured) {
    return false;
  }

  const { customerInfo } = await Purchases.restorePurchases();
  return hasActiveRemoveAdsEntitlement(customerInfo);
}
