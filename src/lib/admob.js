import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  AdmobConsentStatus,
  InterstitialAdPluginEvents,
} from "@capacitor-community/admob";
import { userHasRemovedAds } from "./purchases";
import { monetizationDebug } from "./monetization-debug";

const isDevelopmentBuild = (process.env.VITE_IS_DEV ?? "false") === "true";

let initializationPromise = null;
let consentInfoCache = null;
let interstitialReady = false;
let interstitialListenersRegistered = false;

function debugAdMob(message, details = {}) {
  console.info("[AdMob]", message, details);
}

function canUseNativeAds() {
  return (
    Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("AdMob")
  );
}

function getInterstitialAdUnitId() {
  const platform = Capacitor.getPlatform();

  if (platform === "ios") {
    return isDevelopmentBuild
      ? process.env.VITE_ADMOB_IOS_INTERSTITIAL ?? ""
      : process.env.VITE_ADMOB_REAL_IOS_INTERSTITIAL ||
          process.env.VITE_ADMOB_IOS_INTERSTITIAL ||
          "";
  }

  if (platform === "android") {
    return isDevelopmentBuild
      ? process.env.VITE_ADMOB_ANDROID_INTERSTITIAL ?? ""
      : process.env.VITE_ADMOB_REAL_ANDROID_INTERSTITIAL ||
          process.env.VITE_ADMOB_ANDROID_INTERSTITIAL ||
          "";
  }

  return "";
}

function getInterstitialOptions() {
  return {
    adId: getInterstitialAdUnitId(),
    immersiveMode: true,
    isTesting: isDevelopmentBuild,
    npa: consentInfoCache?.status !== AdmobConsentStatus.OBTAINED,
  };
}

async function prepareInterstitialWithCurrentState() {
  const adId = getInterstitialAdUnitId();

  if (!adId) {
    debugAdMob("Skipping interstitial prepare because no ad unit ID is configured", {
      platform: Capacitor.getPlatform(),
      isDevelopmentBuild,
    });
    monetizationDebug(
      "AdMob: no ad unit",
      "No interstitial ad unit ID is configured for this build."
    );
    return false;
  }

  try {
    debugAdMob("Preparing interstitial", {
      platform: Capacitor.getPlatform(),
      isDevelopmentBuild,
      adId,
      npa: consentInfoCache?.status !== AdmobConsentStatus.OBTAINED,
    });
    await AdMob.prepareInterstitial(getInterstitialOptions());
    interstitialReady = true;
    debugAdMob("Interstitial prepared", { adId });
    return true;
  } catch (error) {
    interstitialReady = false;
    console.warn("[AdMob] Preparing interstitial failed", {
      adId,
      error,
    });
    monetizationDebug(
      "AdMob: prepare failed",
      "Interstitial failed to prepare."
    );
    return false;
  }
}

async function registerInterstitialListeners() {
  if (interstitialListenersRegistered || !canUseNativeAds()) {
    return;
  }

  await Promise.all([
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      interstitialReady = true;
      debugAdMob("Interstitial loaded");
    }),
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      interstitialReady = false;
      debugAdMob("Interstitial dismissed; preparing next one");
      void prepareInterstitial();
    }),
    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
      interstitialReady = false;
      console.warn("[AdMob] Interstitial failed to load", error);
      monetizationDebug(
        "AdMob: failed to load",
        "Interstitial failed to load from AdMob."
      );
    }),
    AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error) => {
      interstitialReady = false;
      console.warn("[AdMob] Interstitial failed to show", error);
      monetizationDebug(
        "AdMob: failed to show",
        "Interstitial loaded but failed to show."
      );
      void prepareInterstitial();
    }),
  ]);

  interstitialListenersRegistered = true;
}

export async function initializeAdMob() {
  if (!canUseNativeAds()) {
    debugAdMob("Native ads unavailable", {
      isNativePlatform: Capacitor.isNativePlatform(),
      pluginAvailable: Capacitor.isPluginAvailable("AdMob"),
    });
    monetizationDebug(
      "AdMob unavailable",
      "Native AdMob plugin is unavailable on this build."
    );
    return false;
  }

  if (await userHasRemovedAds()) {
    debugAdMob("Ads disabled because remove_ads entitlement is active");
    monetizationDebug(
      "Ads disabled",
      "RevenueCat says remove_ads is active on this account."
    );
    return false;
  }

  if (!initializationPromise) {
    initializationPromise = (async () => {
      await registerInterstitialListeners();
      debugAdMob("Initializing AdMob", {
        platform: Capacitor.getPlatform(),
        isDevelopmentBuild,
        adId: getInterstitialAdUnitId(),
      });
      await AdMob.initialize({
        initializeForTesting: isDevelopmentBuild,
        tagForUnderAgeOfConsent: false,
      });

      if (Capacitor.getPlatform() === "ios") {
        const trackingStatus = await AdMob.trackingAuthorizationStatus();

        if (trackingStatus.status === "notDetermined") {
          await AdMob.requestTrackingAuthorization();
        }
      }

      let consentInfo = await AdMob.requestConsentInfo();
      debugAdMob("Consent info received", consentInfo);

      if (!consentInfo.canRequestAds && consentInfo.isConsentFormAvailable) {
        debugAdMob("Showing consent form");
        consentInfo = await AdMob.showConsentForm();
        debugAdMob("Consent form completed", consentInfo);
      }

      consentInfoCache = consentInfo;

      if (consentInfo.canRequestAds) {
        await prepareInterstitialWithCurrentState();
      } else {
        debugAdMob("Ads cannot be requested after consent flow", consentInfo);
        monetizationDebug(
          "AdMob blocked by consent",
          "Consent flow did not allow ad requests."
        );
      }

      return consentInfo.canRequestAds;
    })().catch((error) => {
      console.warn("[AdMob] Initialization failed", error);
      monetizationDebug(
        "AdMob init failed",
        "AdMob initialization failed."
      );
      initializationPromise = null;
      return false;
    });
  }

  return initializationPromise;
}

export async function prepareInterstitial() {
  if (!canUseNativeAds()) {
    return false;
  }

  const canShowAds = await initializeAdMob();

  if (!canShowAds) {
    return false;
  }

  return prepareInterstitialWithCurrentState();
}

export async function maybeShowInterstitialForCompletedPuzzle({
  completedPuzzleCount,
  isBlocked = false,
}) {
  if (
    isBlocked ||
    !Number.isInteger(completedPuzzleCount) ||
    completedPuzzleCount % 2 !== 0
  ) {
    debugAdMob("Skipping interstitial for completion", {
      completedPuzzleCount,
      isBlocked,
      reason: isBlocked
        ? "blocked"
        : !Number.isInteger(completedPuzzleCount)
          ? "invalid_count"
          : "odd_count",
    });
    return false;
  }

  if (await userHasRemovedAds()) {
    debugAdMob("Skipping interstitial because remove_ads entitlement is active");
    return false;
  }

  const canShowAds = await initializeAdMob();

  if (!canShowAds) {
    debugAdMob("AdMob initialization says ads cannot be shown");
    monetizationDebug(
      "Ads unavailable",
      "AdMob says this session cannot show ads."
    );
    return false;
  }

  if (!interstitialReady) {
    debugAdMob("Interstitial not ready; attempting prepare");
    const isPrepared = await prepareInterstitial();

    if (!isPrepared) {
      debugAdMob("Interstitial prepare failed immediately before show");
      return false;
    }
  }

  try {
    debugAdMob("Showing interstitial", { completedPuzzleCount });
    await AdMob.showInterstitial();
    interstitialReady = false;
    monetizationDebug(
      "AdMob shown",
      `Interstitial shown after puzzle ${completedPuzzleCount}.`
    );
    return true;
  } catch (error) {
    interstitialReady = false;
    console.warn("[AdMob] Showing interstitial failed", error);
    monetizationDebug(
      "AdMob show failed",
      "Attempted to show interstitial, but it failed."
    );
    void prepareInterstitial();
    return false;
  }
}
