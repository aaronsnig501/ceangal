let stopActivePlayback = null;

function stopCurrentPlayback() {
  stopActivePlayback?.();
  stopActivePlayback = null;
}

function createSpeechSequence(words) {
  if (
    typeof window === "undefined" ||
    typeof window.speechSynthesis === "undefined"
  ) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const speech = window.speechSynthesis;
    let hasStopped = false;
    let activeUtterance = null;

    const cleanup = () => {
      if (stopActivePlayback === stopPlayback) {
        stopActivePlayback = null;
      }
    };

    const stopPlayback = () => {
      hasStopped = true;
      speech.cancel();
      cleanup();
      resolve();
    };

    stopActivePlayback = stopPlayback;
    speech.cancel();

    const speakWordAtIndex = (index) => {
      if (hasStopped || index >= words.length) {
        cleanup();
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(words[index]);
      activeUtterance = utterance;
      utterance.lang = "ga-IE";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => speakWordAtIndex(index + 1);
      utterance.onerror = (event) => {
        cleanup();
        reject(event.error ?? new Error("Speech synthesis failed"));
      };
      speech.speak(utterance);
    };

    if (activeUtterance == null) {
      speakWordAtIndex(0);
    }
  });
}

function createAudioSequence(audioSources) {
  if (typeof Audio === "undefined" || audioSources.length === 0) {
    return null;
  }

  return new Promise((resolve, reject) => {
    let index = 0;
    let currentAudio = null;
    let hasStopped = false;

    const cleanup = () => {
      if (currentAudio != null) {
        currentAudio.pause();
        currentAudio.src = "";
        currentAudio.load();
      }
      if (stopActivePlayback === stopPlayback) {
        stopActivePlayback = null;
      }
    };

    const stopPlayback = () => {
      hasStopped = true;
      cleanup();
      resolve();
    };

    const playNext = () => {
      if (hasStopped || index >= audioSources.length) {
        cleanup();
        resolve();
        return;
      }

      currentAudio = new Audio(audioSources[index]);
      currentAudio.preload = "auto";
      currentAudio.onended = () => {
        index += 1;
        playNext();
      };
      currentAudio.onerror = () => {
        cleanup();
        reject(new Error("Audio playback failed"));
      };
      currentAudio.play().catch((error) => {
        cleanup();
        reject(error);
      });
    };

    stopActivePlayback = stopPlayback;
    playNext();
  });
}

export async function playPronunciation({
  words,
  audioSourcesByWord = {},
}) {
  stopCurrentPlayback();

  const orderedAudioSources = words
    .map((word) => audioSourcesByWord[word])
    .filter(Boolean);

  if (orderedAudioSources.length === words.length && words.length > 0) {
    return createAudioSequence(orderedAudioSources);
  }

  return createSpeechSequence(words);
}

export function canPlayPronunciation({ words, audioSourcesByWord = {} }) {
  const hasWordAudio =
    words.length > 0 &&
    words.every((word) => typeof audioSourcesByWord[word] === "string");

  const hasSpeechSynthesis =
    typeof window !== "undefined" &&
    typeof window.speechSynthesis !== "undefined";

  return hasWordAudio || hasSpeechSynthesis;
}

export function stopPronunciation() {
  stopCurrentPlayback();
}
