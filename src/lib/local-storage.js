const gameStateKey = "gameState";
const hasSeenOnboardingKey = "hasSeenOnboarding";
const dismissedEndGameResultKey = "dismissedEndGameResult";
const showEnglishTranslationsKey = "showEnglishTranslations";
const playedPuzzlesKey = "playedPuzzles";

export const saveGameStateToLocalStorage = (gameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  return state ? JSON.parse(state) : null;
};

const gameStatKey = "gameStats";

export const saveStatsToLocalStorage = (gameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey);
  return stats ? JSON.parse(stats) : null;
};

export const saveHasSeenOnboardingToLocalStorage = () => {
  localStorage.setItem(hasSeenOnboardingKey, "true");
};

export const loadHasSeenOnboardingFromLocalStorage = () => {
  return localStorage.getItem(hasSeenOnboardingKey) === "true";
};

export const saveDismissedEndGameResultToLocalStorage = (puzzleId) => {
  localStorage.setItem(dismissedEndGameResultKey, String(puzzleId));
};

export const loadDismissedEndGameResultFromLocalStorage = (puzzleId) => {
  return localStorage.getItem(dismissedEndGameResultKey) === String(puzzleId);
};

export const saveShowEnglishTranslationsToLocalStorage = (showTranslations) => {
  localStorage.setItem(showEnglishTranslationsKey, String(showTranslations));
};

export const loadShowEnglishTranslationsFromLocalStorage = () => {
  return localStorage.getItem(showEnglishTranslationsKey) === "true";
};

export const savePlayedPuzzleToLocalStorage = (puzzleIndex) => {
  const playedPuzzles = loadPlayedPuzzlesFromLocalStorage();
  localStorage.setItem(
    playedPuzzlesKey,
    JSON.stringify([...new Set([...playedPuzzles, puzzleIndex])])
  );
};

export const loadPlayedPuzzlesFromLocalStorage = () => {
  const playedPuzzles = localStorage.getItem(playedPuzzlesKey);

  if (!playedPuzzles) {
    return [];
  }

  try {
    const parsedPuzzles = JSON.parse(playedPuzzles);
    return Array.isArray(parsedPuzzles) ? parsedPuzzles : [];
  } catch (error) {
    return [];
  }
};
