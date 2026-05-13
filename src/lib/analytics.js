const plausibleDomain = process.env.PLAUSIBLE_DOMAIN ?? "";
const plausibleApiHost = (process.env.PLAUSIBLE_API_HOST ??
  "https://plausible.io").replace(/\/$/, "");
const plausibleScriptSrc =
  process.env.PLAUSIBLE_SCRIPT_SRC ?? `${plausibleApiHost}/js/script.js`;

const PLAUSIBLE_SCRIPT_ID = "plausible-analytics-script";

export function isPlausibleEnabled() {
  return plausibleDomain.trim().length > 0;
}

export function initializePlausible() {
  if (!isPlausibleEnabled() || typeof document === "undefined") {
    return;
  }

  if (typeof window.plausible !== "function") {
    window.plausible = function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
  }

  if (document.getElementById(PLAUSIBLE_SCRIPT_ID) != null) {
    return;
  }

  const script = document.createElement("script");
  script.id = PLAUSIBLE_SCRIPT_ID;
  script.defer = true;
  script.src = plausibleScriptSrc;
  script.dataset.domain = plausibleDomain;

  if (plausibleApiHost !== "https://plausible.io") {
    script.dataset.api = `${plausibleApiHost}/api/event`;
  }

  document.head.appendChild(script);
}

export function trackEvent(name, options = {}) {
  if (!isPlausibleEnabled() || typeof window === "undefined") {
    return;
  }

  if (typeof window.plausible !== "function") {
    return;
  }

  window.plausible(name, options);
}
