const gameStateKey = "gameState";
const hasSeenOnboardingKey = "hasSeenOnboarding";
const dismissedEndGameResultKey = "dismissedEndGameResult";
const showEnglishTranslationsKey = "showEnglishTranslations";
const playedPuzzlesKey = "playedPuzzles";

const getGameStateStorageKey = (dateKey) => {
  return dateKey ? `${gameStateKey}:${dateKey}` : gameStateKey;
};

export const saveGameStateToLocalStorage = (gameState, dateKey) => {
  localStorage.setItem(
    getGameStateStorageKey(dateKey),
    JSON.stringify(gameState)
  );
};

export const loadGameStateFromLocalStorage = (dateKey) => {
  const state = localStorage.getItem(getGameStateStorageKey(dateKey));
  return state ? JSON.parse(state) : null;
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
