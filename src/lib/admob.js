import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  AdmobConsentStatus,
  InterstitialAdPluginEvents,
} from "@capacitor-community/admob";
import { userHasRemovedAds } from "./purchases";

const env = import.meta.env ?? {};
const isDevelopmentBuild = (env.VITE_IS_DEV ?? "false") === "true";

let initializationPromise = null;
let consentInfoCache = null;
let interstitialReady = false;
let interstitialListenersRegistered = false;

function canUseNativeAds() {
  return (
    Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("AdMob")
  );
}

function getInterstitialAdUnitId() {
  const platform = Capacitor.getPlatform();

  if (platform === "ios") {
    return isDevelopmentBuild
      ? env.VITE_ADMOB_IOS_INTERSTITIAL ?? ""
      : env.VITE_ADMOB_REAL_IOS_INTERSTITIAL ||
          env.VITE_ADMOB_IOS_INTERSTITIAL ||
          "";
  }

  if (platform === "android") {
    return isDevelopmentBuild
      ? env.VITE_ADMOB_ANDROID_INTERSTITIAL ?? ""
      : env.VITE_ADMOB_REAL_ANDROID_INTERSTITIAL ||
          env.VITE_ADMOB_ANDROID_INTERSTITIAL ||
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
    return false;
  }

  try {
    await AdMob.prepareInterstitial(getInterstitialOptions());
    interstitialReady = true;
    return true;
  } catch (error) {
    interstitialReady = false;
    console.warn("Preparing interstitial failed", error);
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
    }),
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      interstitialReady = false;
      void prepareInterstitial();
    }),
    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
      interstitialReady = false;
      console.warn("Interstitial failed to load", error);
    }),
    AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error) => {
      interstitialReady = false;
      console.warn("Interstitial failed to show", error);
      void prepareInterstitial();
    }),
  ]);

  interstitialListenersRegistered = true;
}

export async function initializeAdMob() {
  if (!canUseNativeAds()) {
    return false;
  }

  if (await userHasRemovedAds()) {
    return false;
  }

  if (!initializationPromise) {
    initializationPromise = (async () => {
      await registerInterstitialListeners();
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

      if (!consentInfo.canRequestAds && consentInfo.isConsentFormAvailable) {
        consentInfo = await AdMob.showConsentForm();
      }

      consentInfoCache = consentInfo;

      if (consentInfo.canRequestAds) {
        await prepareInterstitialWithCurrentState();
      }

      return consentInfo.canRequestAds;
    })().catch((error) => {
      console.warn("AdMob initialization failed", error);
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
    return false;
  }

  if (await userHasRemovedAds()) {
    return false;
  }

  const canShowAds = await initializeAdMob();

  if (!canShowAds) {
    return false;
  }

  if (!interstitialReady) {
    const isPrepared = await prepareInterstitial();

    if (!isPrepared) {
      return false;
    }
  }

  try {
    await AdMob.showInterstitial();
    interstitialReady = false;
    return true;
  } catch (error) {
    interstitialReady = false;
    console.warn("Showing interstitial failed", error);
    void prepareInterstitial();
    return false;
  }
}
