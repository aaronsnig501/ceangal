import React from "react";
import { MAX_MISTAKES } from "../../lib/constants";
import { PuzzleDataContext } from "../PuzzleDataProvider";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "../../lib/local-storage";
import { isGuessesFromGame } from "../../lib/game-helpers";
import { puzzleId } from "../../lib/time-utils";
export const GameStatusContext = React.createContext();
export const GuessCandidateContext = React.createContext();

function getInitialGameStatus(gameData, dateKey) {
  const fallbackState = {
    submittedGuesses: [],
    solvedGameData: [],
    isGameOver: false,
    isGameWon: false,
    wasGameOverOnLoad: false,
  };
  const loadedState = loadGameStateFromLocalStorage(dateKey);
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
  const [guessCandidate, setGuessCandidate] = React.useState([]);
  const wasGameOverOnLoad = initialGameStatus.wasGameOverOnLoad;

  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;
  const isGameWon = solvedGameData.length === gameData.length;
  const isGameOver = isGameWon || numMistakesUsed >= MAX_MISTAKES;

  React.useEffect(() => {
    saveGameStateToLocalStorage(
      {
        submittedGuesses,
        solvedGameData,
      },
      puzzleId
    );
  }, [submittedGuesses, solvedGameData]);

  const value = React.useMemo(
    () => ({
      isGameOver,
      isGameWon,
      numMistakesUsed,
      solvedGameData,
      setSolvedGameData,
      submittedGuesses,
      setSubmittedGuesses,
      wasGameOverOnLoad,
    }),
    [
      isGameOver,
      isGameWon,
      numMistakesUsed,
      solvedGameData,
      submittedGuesses,
      wasGameOverOnLoad,
    ]
  );

  const guessCandidateValue = React.useMemo(
    () => ({
      guessCandidate,
      setGuessCandidate,
    }),
    [guessCandidate]
  );

  return (
    <GameStatusContext.Provider value={value}>
      <GuessCandidateContext.Provider value={guessCandidateValue}>
        {children}
      </GuessCandidateContext.Provider>
    </GameStatusContext.Provider>
  );
}

export default GameStatusProvider;
