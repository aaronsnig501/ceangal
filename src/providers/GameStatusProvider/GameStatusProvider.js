import React from "react";
import { MAX_MISTAKES } from "../../lib/constants";
import { PuzzleDataContext } from "../PuzzleDataProvider";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "../../lib/local-storage";
import {
  isGameDataEquivalent,
  isGuessesFromGame,
} from "../../lib/game-helpers";
import { puzzleId } from "../../lib/time-utils";
export const GameStatusContext = React.createContext();

function getInitialGameStatus(gameData, dateKey) {
  const fallbackState = {
    submittedGuesses: [],
    solvedGameData: [],
    isGameOver: false,
    isGameWon: false,
    wasGameOverOnLoad: false,
  };
  const loadedState = loadGameStateFromLocalStorage(dateKey);

  console.log("checking game state!", {
    loadedState: loadedState,
    gd1: gameData,
    gd2: loadedState?.gameData,
  });

  if (!isGameDataEquivalent({ gd1: gameData, gd2: loadedState?.gameData })) {
    return fallbackState;
  }
  if (
    !isGuessesFromGame({
      gameData,
      submittedGuesses: loadedState?.submittedGuesses,
    })
  ) {
    return fallbackState;
  }

  const submittedGuesses = Array.isArray(loadedState?.submittedGuesses)
    ? loadedState.submittedGuesses
    : [];
  const solvedGameData = Array.isArray(loadedState?.solvedGameData)
    ? loadedState.solvedGameData
    : [];
  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;
  const isGameWon = solvedGameData.length === gameData.length;
  const isGameOver = isGameWon || numMistakesUsed >= MAX_MISTAKES;

  return {
    submittedGuesses,
    solvedGameData,
    isGameOver,
    isGameWon,
    wasGameOverOnLoad: isGameOver,
  };
}

function GameStatusProvider({ children }) {
  const { gameData } = React.useContext(PuzzleDataContext);
  const [initialGameStatus] = React.useState(() =>
    getInitialGameStatus(gameData, puzzleId)
  );
  const [submittedGuesses, setSubmittedGuesses] = React.useState(
    initialGameStatus.submittedGuesses
  );
  const [solvedGameData, setSolvedGameData] = React.useState(
    initialGameStatus.solvedGameData
  );

  const [isGameOver, setIsGameOver] = React.useState(
    initialGameStatus.isGameOver
  );
  const [isGameWon, setIsGameWon] = React.useState(
    initialGameStatus.isGameWon
  );
  const [guessCandidate, setGuessCandidate] = React.useState([]);
  const wasGameOverOnLoad = initialGameStatus.wasGameOverOnLoad;

  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;

  // use effect to check if game is won
  React.useEffect(() => {
    if (solvedGameData.length === gameData.length) {
      setIsGameOver(true);
      setIsGameWon(true);
    }
    const gameState = { submittedGuesses, solvedGameData, gameData };
    saveGameStateToLocalStorage(gameState, puzzleId);
  }, [solvedGameData]);

  // use effect to check if all mistakes have been used and end the game accordingly
  React.useEffect(() => {
    if (numMistakesUsed >= MAX_MISTAKES) {
      setIsGameOver(true);
      setIsGameWon(false);
    }
    const gameState = { submittedGuesses, solvedGameData, gameData };
    saveGameStateToLocalStorage(gameState, puzzleId);
  }, [submittedGuesses]);

  return (
    <GameStatusContext.Provider
      value={{
        isGameOver,
        isGameWon,
        numMistakesUsed,
        solvedGameData,
        setSolvedGameData,
        submittedGuesses,
        setSubmittedGuesses,
        guessCandidate,
        setGuessCandidate,
        wasGameOverOnLoad,
      }}
    >
      {children}
    </GameStatusContext.Provider>
  );
}

export default GameStatusProvider;
