import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
  startOfToday,
  startOfYesterday,
} from "date-fns";

import queryString from "query-string";

import { allPuzzles, CONNECTION_GAMES, LAUNCH_DATE } from "./data";

export const getToday = () => startOfToday();
export const getYesterday = () => startOfYesterday();

export const firstGameDate = LAUNCH_DATE;
export const periodInDays = 7;

export const getLastGameDate = (today) => {
  const t = startOfDay(today);
  let daysSinceLastGame = differenceInDays(t, firstGameDate) % periodInDays;
  return addDays(t, -daysSinceLastGame);
};

export const getNextGameDate = (today) => {
  return addDays(getLastGameDate(today), periodInDays);
};

export const getGameDateForPuzzleIndex = (index) => {
  return addDays(firstGameDate, index * periodInDays);
};

export const isValidGameDate = (date) => {
  if (date < firstGameDate || date > getToday()) {
    return false;
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0;
};

export const getIndex = (gameDate) => {
  let start = firstGameDate;
  let index = -1;
  console.log(firstGameDate);
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);

  return index;
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

export const getSolution = (gameDate) => {
  const nextGameDate = getNextGameDate(gameDate);
  const index = getIndex(gameDate);
  const puzzleOfTheDay = getPuzzleOfDay(index);
  const puzzleTitle = getPuzzleTitleOfDay(index);
  console.log("index for today: ", index);
  return {
    puzzleAnswers: puzzleOfTheDay,
    puzzleGameDate: gameDate,
    puzzleTitle,
    puzzleIndex: index,
    dateOfNextPuzzle: nextGameDate.valueOf(),
  };
};

export const getGameDate = () => {
  const parsed = queryString.parse(window.location.search);

  if ("p" in parsed) {
    const puzzleIndexFromQuery = Number.parseInt(parsed.p?.toString(), 10);

    if (
      Number.isInteger(puzzleIndexFromQuery) &&
      puzzleIndexFromQuery >= 0 &&
      puzzleIndexFromQuery < allPuzzles.length
    ) {
      return getGameDateForPuzzleIndex(puzzleIndexFromQuery);
    }
  }

  if (getIsLatestGame()) {
    return getToday();
  }

  try {
    const d = startOfDay(parseISO(parsed.d?.toString()));
    if (d >= getToday() || d < firstGameDate) {
      setGameDate(getToday());
    }
    return d;
  } catch (e) {
    console.log(e);
    return getToday();
  }
};

export const setGameDate = (d) => {
  try {
    if (d < getToday()) {
      window.location.href = "/?d=" + formatISO(d, { representation: "date" });
      return;
    }
  } catch (e) {
    console.log(e);
  }
  window.location.href = "/";
};

export const setPuzzleIndex = (index) => {
  const latestPuzzleIndex = getIndex(getLastGameDate(getToday()));

  if (index === latestPuzzleIndex) {
    window.location.href = "/";
    return;
  }

  window.location.href = "/?p=" + index;
};

export const getIsLatestGame = () => {
  // https://github.com/cwackerfuss/react-wordle/pull/505
  const parsed = queryString.parse(window.location.search);
  return parsed === null || (!("d" in parsed) && !("p" in parsed));
};

export const {
  puzzleAnswers,
  puzzleGameDate,
  puzzleTitle,
  puzzleIndex,
  dateOfNextPuzzle,
} = getSolution(getGameDate());
