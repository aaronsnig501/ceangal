const gameStateKey = "gameState";
const hasSeenOnboardingKey = "hasSeenOnboarding";
const dismissedEndGameResultKey = "dismissedEndGameResult";
const showEnglishTranslationsKey = "showEnglishTranslations";
const themePreferenceKey = "themePreference";
const donePuzzleKeyPrefix = "ceangal-done-";
const completedPuzzleCountForAdsKey = "adInterstitialCompletionCount";

const getGameStateStorageKey = (puzzleId) => {
  return puzzleId ? `${gameStateKey}:puzzle:${puzzleId}` : gameStateKey;
};

export const saveGameStateToLocalStorage = (gameState, puzzleId) => {
  localStorage.setItem(
    getGameStateStorageKey(puzzleId),
    JSON.stringify(gameState)
  );
};

export const loadGameStateFromLocalStorage = (puzzleId) => {
  const state = localStorage.getItem(getGameStateStorageKey(puzzleId));
  if (!state) {
    return null;
  }

  try {
    return JSON.parse(state);
  } catch (error) {
    return null;
  }
};

const gameStatKey = "gameStats";
const defaultGameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  },
  recordedPuzzles: [],
};

export const saveStatsToLocalStorage = (gameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey);
  if (!stats) {
    return defaultGameStats;
  }

  try {
    const parsedStats = JSON.parse(stats);
    return {
      ...defaultGameStats,
      ...parsedStats,
      guessDistribution: {
        ...defaultGameStats.guessDistribution,
        ...(parsedStats.guessDistribution ?? {}),
      },
      recordedPuzzles: Array.isArray(parsedStats.recordedPuzzles)
        ? parsedStats.recordedPuzzles
        : [],
    };
  } catch (error) {
    return defaultGameStats;
  }
};

export const recordCompletedPuzzleStats = ({
  puzzleKey,
  isGameWon,
  numMistakesUsed,
}) => {
  const stats = loadStatsFromLocalStorage();

  if (stats.recordedPuzzles.includes(puzzleKey)) {
    return stats;
  }

  const nextCurrentStreak = isGameWon ? stats.currentStreak + 1 : 0;
  const nextStats = {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + (isGameWon ? 1 : 0),
    currentStreak: nextCurrentStreak,
    maxStreak: Math.max(stats.maxStreak, nextCurrentStreak),
    recordedPuzzles: [...stats.recordedPuzzles, puzzleKey],
    guessDistribution: {
      ...stats.guessDistribution,
    },
  };

  if (isGameWon && numMistakesUsed >= 1 && numMistakesUsed <= 4) {
    nextStats.guessDistribution[numMistakesUsed] =
      (nextStats.guessDistribution[numMistakesUsed] ?? 0) + 1;
  }

  saveStatsToLocalStorage(nextStats);
  return nextStats;
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

export const saveThemePreferenceToLocalStorage = (themePreference) => {
  localStorage.setItem(themePreferenceKey, themePreference);
};

export const loadThemePreferenceFromLocalStorage = () => {
  const storedThemePreference = localStorage.getItem(themePreferenceKey);

  if (storedThemePreference === "dark" || storedThemePreference === "light") {
    return storedThemePreference;
  }

  return null;
};

export const saveCompletedPuzzleToLocalStorage = (puzzleId) => {
  localStorage.setItem(`${donePuzzleKeyPrefix}${puzzleId}`, "true");
};

export const loadIsPuzzleCompletedFromLocalStorage = (puzzleId) => {
  return localStorage.getItem(`${donePuzzleKeyPrefix}${puzzleId}`) === "true";
};

export const loadCompletedPuzzlesFromLocalStorage = () => {
  const completedPuzzles = new Set();

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key?.startsWith(donePuzzleKeyPrefix)) {
      const puzzleId = Number.parseInt(
        key.slice(donePuzzleKeyPrefix.length),
        10
      );

      if (Number.isInteger(puzzleId)) {
        completedPuzzles.add(puzzleId);
      }
    }
  }

  return [...completedPuzzles];
};

export const recordPuzzleCompletionForAds = () => {
  const storedCount = Number.parseInt(
    localStorage.getItem(completedPuzzleCountForAdsKey) ?? "",
    10
  );
  const nextCount =
    Number.isInteger(storedCount) && storedCount > 0 ? storedCount + 1 : 1;

  localStorage.setItem(completedPuzzleCountForAdsKey, String(nextCount));

  return nextCount;
};
