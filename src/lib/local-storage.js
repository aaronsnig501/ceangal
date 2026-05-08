const gameStateKey = "gameState";
const hasSeenOnboardingKey = "hasSeenOnboarding";
const dismissedEndGameResultKey = "dismissedEndGameResult";

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
