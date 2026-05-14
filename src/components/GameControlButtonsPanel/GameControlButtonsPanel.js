import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Shuffle, Undo, SendHorizontal } from "lucide-react";
import {
  isGuessCorrect,
  isGuessRepeated,
  shuffleGameData,
} from "../../lib/game-helpers";
import {
  triggerCorrectGuessHaptic,
  triggerWrongGuessHaptic,
} from "../../lib/haptics";

import {
  GameStatusContext,
  GuessCandidateContext,
} from "../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";

function GameControlButtonsPanel({
  shuffledRows,
  setShuffledRows,
  setGridShake,
}) {
  const {
    isGameOver,
    submittedGuesses,
    setSubmittedGuesses,
    solvedGameData,
    setSolvedGameData,
  } = React.useContext(GameStatusContext);
  const { guessCandidate, setGuessCandidate } =
    React.useContext(GuessCandidateContext);
  const { gameData, categorySize } = React.useContext(PuzzleDataContext);
  const { toast } = useToast();

  function deselectAll() {
    setGuessCandidate([]);
  }

  function submitCandidateGuess() {
    // check that its a valid guess by size
    if (guessCandidate.length !== categorySize) {
      return;
    }
    // check that the guess hasnt already been submitted previously
    if (isGuessRepeated({ submittedGuesses, guessCandidate })) {
      toast({
        label: "Notification",
        title: "Rogha déanta cheana",
        description: "Rinne tú an rogha seo cheana.",
      });

      return;
    }
    // add guess to state
    setSubmittedGuesses((currentGuesses) => [
      ...currentGuesses,
      guessCandidate,
    ]);
    // check if the guess is correct
    const {
      isCorrect,
      correctWords,
      correctCategory,
      isGuessOneAway,
      correctDifficulty,
      correctImageSrc,
      correctPronunciations,
    } = isGuessCorrect({
      guessCandidate,
      gameData,
    });

    // if the guess is correct:
    // set it as solved in game data
    if (isCorrect) {
      triggerCorrectGuessHaptic();
      setSolvedGameData((currentSolvedGameData) => [
        ...currentSolvedGameData,
        {
          category: correctCategory,
          words: correctWords,
          difficulty: correctDifficulty,
          imageSrc: correctImageSrc,
          pronunciations: correctPronunciations,
        },
      ]);
      setGuessCandidate([]);
    } else {
      triggerWrongGuessHaptic();
      // Shake the grid to give feedback that they were wrong
      setGridShake(true);
      if (isGuessOneAway) {
        toast({
          label: "Notification",
          title: "Beagnach ann",
          description: "Tá focal amháin as áit sa rogha sin.",
        });
      }
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        disabled={isGameOver}
        variant="secondary"
        onClick={() =>
          setShuffledRows(shuffleGameData({ gameData: shuffledRows }))
        }
      >
        <Shuffle className="h-4 w-4 mr-2" strokeWidth={1} />
        <p className="select-none">Measc</p>
      </Button>
      <Button
        size="deselectallsize"
        disabled={isGameOver}
        variant="secondary"
        onClick={deselectAll}
      >
        <Undo className="h-4 w-4 mr-2" strokeWidth={1} />
        <p className="select-none">Glan</p>
      </Button>
      <Button
        variant="submit"
        onClick={submitCandidateGuess}
        disabled={isGameOver || guessCandidate.length !== categorySize}
      >
        <SendHorizontal className="h-4 w-4 mr-2" strokeWidth={1} />
        <p className="select-none">Seol</p>
      </Button>
    </div>
  );
}

export default GameControlButtonsPanel;
