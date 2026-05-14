import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";

const env = import.meta.env ?? {};
const removeAdsEntitlement =
  env.VITE_RC_REMOVE_ADS_ENTITLEMENT ?? "remove_ads";
const defaultOfferingIdentifier = "default";

let purchasesConfigurationPromise = null;

function getRevenueCatApiKey() {
  const platform = Capacitor.getPlatform();

  if (platform === "ios") {
    return env.VITE_RC_IOS_KEY ?? "";
  }

  if (platform === "android") {
    return env.VITE_RC_ANDROID_KEY ?? "";
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
    return false;
  }

  if (!purchasesConfigurationPromise) {
    purchasesConfigurationPromise = Purchases.configure({
      apiKey: getRevenueCatApiKey(),
    })
      .then(() => true)
      .catch((error) => {
        console.warn("RevenueCat configuration failed", error);
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
    return false;
  }

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    return hasActiveRemoveAdsEntitlement(customerInfo);
  } catch (error) {
    console.warn("RevenueCat customer info lookup failed", error);
    return false;
  }
}

export async function loadRemoveAdsProduct() {
  const isConfigured = await initializePurchases();

  if (!isConfigured) {
    return null;
  }

  const offerings = await Purchases.getOfferings();
  const defaultOffering =
    offerings.all?.[defaultOfferingIdentifier] ?? offerings.current ?? null;

  if (!defaultOffering) {
    return null;
  }

  return (
    defaultOffering.lifetime ??
    defaultOffering.availablePackages?.[0] ??
    null
  );
}

export async function purchaseRemoveAds() {
  const selectedPackage = await loadRemoveAdsProduct();

  if (!selectedPackage) {
    const missingPackageError = new Error("REMOVE_ADS_PRODUCT_UNAVAILABLE");
    missingPackageError.code = "REMOVE_ADS_PRODUCT_UNAVAILABLE";
    throw missingPackageError;
  }

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
