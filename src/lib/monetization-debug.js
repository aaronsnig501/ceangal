import { Capacitor } from "@capacitor/core";
import { toast } from "../components/ui/use-toast";

const debugEnabled = (process.env.VITE_MONETIZATION_DEBUG ?? "true") === "true";
const maxEntries = 6;
const debugEventName = "ceangal:monetization-debug";

function shouldToastEntry(title) {
  const normalizedTitle = title.toLowerCase();

  return [
    "failed",
    "unavailable",
    "blocked",
    "no ad unit",
    "no remove ads product",
    "purchase unavailable",
    "customer lookup failed",
    "show failed",
    "prepare failed",
    "init failed",
    "config failed",
  ].some((fragment) => normalizedTitle.includes(fragment));
}

function emitDebugEntry(entry) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(debugEventName, {
      detail: entry,
    })
  );
}

export function monetizationDebug(title, description, details = {}) {
  if (!debugEnabled) {
    return;
  }

  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    description,
    details,
    createdAt: new Date().toISOString(),
  };

  console.info("[Monetization]", title, { description, ...details });
  emitDebugEntry(entry);

  if (!Capacitor.isNativePlatform()) {
    return;
  }

  if (!shouldToastEntry(title)) {
    return;
  }

  toast({
    label: "Monetization Debug",
    title,
    description,
  });
}

export function subscribeToMonetizationDebug(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleEvent(event) {
    callback(event.detail);
  }

  window.addEventListener(debugEventName, handleEvent);
  return () => window.removeEventListener(debugEventName, handleEvent);
}

export function appendMonetizationDebugEntry(currentEntries, nextEntry) {
  return [nextEntry, ...currentEntries].slice(0, maxEntries);
}
