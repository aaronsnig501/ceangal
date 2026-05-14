import { Capacitor } from "@capacitor/core";
import {
  Haptics,
  ImpactStyle,
  NotificationType,
} from "@capacitor/haptics";

const isNativePlatform = Capacitor.isNativePlatform();

async function runHaptic(callback) {
  if (!isNativePlatform) {
    return;
  }

  try {
    await callback();
  } catch (error) {
    // Ignore missing haptics support on unsupported devices.
  }
}

export function triggerTileHaptic() {
  return runHaptic(() =>
    Haptics.impact({ style: ImpactStyle.Light })
  );
}

export function triggerCorrectGuessHaptic() {
  return runHaptic(() =>
    Haptics.impact({ style: ImpactStyle.Medium })
  );
}

export function triggerWrongGuessHaptic() {
  return runHaptic(() =>
    Haptics.notification({ type: NotificationType.Error })
  );
}

export function canUseNativeHaptics() {
  return isNativePlatform;
}
