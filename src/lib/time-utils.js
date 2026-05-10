import { addDays, differenceInDays, formatISO, startOfDay } from "date-fns";
import queryString from "query-string";

import { allPuzzles, CONNECTION_GAMES, LAUNCH_DATE } from "./data";
import { loadCompletedPuzzlesFromLocalStorage } from "./local-storage";

export const firstGameDate = LAUNCH_DATE;
export const periodInDays = 1;

export const getGameDateForPuzzleIndex = (index) => {
  return addDays(firstGameDate, index * periodInDays);
};

export const getIndex = (gameDate) => {
  return Math.max(0, differenceInDays(startOfDay(gameDate), firstGameDate));
};

export const getPuzzleOfDay = (index) => {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  return CONNECTION_GAMES[index % CONNECTION_GAMES.length];
};

export const getPuzzleTitleOfDay = (index) => {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  return allPuzzles[index % allPuzzles.length].title;
};

export const getDefaultPuzzleIndex = () => {
  const completedPuzzleIds = loadCompletedPuzzlesFromLocalStorage();
  const firstUnplayedIndex = allPuzzles.findIndex(
    (puzzle) => !completedPuzzleIds.includes(puzzle.id)
  );

  return firstUnplayedIndex === -1 ? 0 : firstUnplayedIndex;
};

export const getAreAllPuzzlesCompleted = () => {
  const completedPuzzleIds = loadCompletedPuzzlesFromLocalStorage();
  return allPuzzles.every((puzzle) => completedPuzzleIds.includes(puzzle.id));
};

export const getSelectedPuzzleIndex = () => {
  const parsed = queryString.parse(window.location.search);

  if ("p" in parsed) {
    const puzzleIndexFromQuery = Number.parseInt(parsed.p?.toString(), 10);

    if (
      Number.isInteger(puzzleIndexFromQuery) &&
      puzzleIndexFromQuery >= 0 &&
      puzzleIndexFromQuery < allPuzzles.length
    ) {
      return puzzleIndexFromQuery;
    }
  }

  return getDefaultPuzzleIndex();
};

export const getSolution = (index) => {
  const normalizedIndex = index % CONNECTION_GAMES.length;
  const puzzle = allPuzzles[normalizedIndex];

  return {
    puzzleAnswers: CONNECTION_GAMES[normalizedIndex],
    puzzleGameDate: getGameDateForPuzzleIndex(normalizedIndex),
    puzzleId: puzzle.id,
    puzzleTitle: puzzle.title,
    puzzleIndex: normalizedIndex,
    dateOfNextPuzzle: addDays(new Date(), 1).valueOf(),
  };
};

export const setPuzzleIndex = (index) => {
  window.location.href = "/?p=" + index;
};

export const setGameDate = (date) => {
  window.location.href =
    "/?p=" + (getIndex(startOfDay(date)) % allPuzzles.length);
};

export const getGameDateKey = (gameDate) => {
  return formatISO(startOfDay(gameDate), { representation: "date" });
};

export const getIsLatestGame = () => false;

export const {
  puzzleAnswers,
  puzzleGameDate,
  puzzleId,
  puzzleTitle,
  puzzleIndex,
  dateOfNextPuzzle,
} = getSolution(getSelectedPuzzleIndex());

export const puzzleDateKey = String(puzzleId);
export const allPuzzlesCompletedOnBoot = getAreAllPuzzlesCompleted();
