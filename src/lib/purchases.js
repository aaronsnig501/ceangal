import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";

const env = import.meta.env ?? {};
const removeAdsEntitlement =
  env.VITE_RC_REMOVE_ADS_ENTITLEMENT ?? "remove_ads";

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

function canUseRevenueCat() {
  return (
    Capacitor.isNativePlatform() &&
    Capacitor.isPluginAvailable("Purchases") &&
    Boolean(getRevenueCatApiKey())
  );
}

async function configurePurchasesIfNeeded() {
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

export async function userHasRemovedAds() {
  const isConfigured = await configurePurchasesIfNeeded();

  if (!isConfigured) {
    return false;
  }

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();

    return Boolean(
      customerInfo.entitlements.active?.[removeAdsEntitlement]?.isActive
    );
  } catch (error) {
    console.warn("RevenueCat customer info lookup failed", error);
    return false;
  }
}
