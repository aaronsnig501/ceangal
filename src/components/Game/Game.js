import React from "react";
import { shuffleGameData } from "../../lib/game-helpers";
import GameGrid from "../GameGrid";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";
import GameLostModal from "../modals/GameLostModal";
import GameWonModal from "../modals/GameWonModal";

import { Separator } from "../ui/separator";

import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { GameStatusContext } from "../../providers/GameStatusProvider";
import GameControlButtonsPanel from "../GameControlButtonsPanel";

import ViewResultsModal from "../modals/ViewResultsModal";
import {
  loadDismissedEndGameResultFromLocalStorage,
  recordCompletedPuzzleStats,
  savePlayedPuzzleToLocalStorage,
  saveDismissedEndGameResultToLocalStorage,
} from "../../lib/local-storage";
import {
  puzzleId,
  puzzleIndex,
} from "../../lib/time-utils";

function Game({
  showEnglishTranslations = false,
  suppressEndGameModal = false,
}) {
  const { gameData, categorySize, numCategories } =
    React.useContext(PuzzleDataContext);
  const {
    submittedGuesses,
    solvedGameData,
    isGameOver,
    isGameWon,
    numMistakesUsed,
    wasGameOverOnLoad,
  } = React.useContext(GameStatusContext);

  const [shuffledRows, setShuffledRows] = React.useState(
    shuffleGameData({ gameData })
  );
  const [isEndGameModalOpen, setIsEndGameModalOpen] = React.useState(false);
  const [isEndGameModalDismissed, setIsEndGameModalDismissed] = React.useState(
    () => loadDismissedEndGameResultFromLocalStorage(puzzleId)
  );
  const previousIsGameOver = React.useRef(isGameOver);
  const [gridShake, setGridShake] = React.useState(false);

  // use effect to update Game Grid after a row has been correctly solved
  React.useEffect(() => {
    const categoriesToRemoveFromRows = solvedGameData.map(
      (data) => data.category
    );
    const dataLeftForRows = gameData.filter((data) => {
      return !categoriesToRemoveFromRows.includes(data.category);
    });
    if (dataLeftForRows.length > 0) {
      setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
    }
  }, [solvedGameData]);

  // Handle End Game!
  React.useEffect(() => {
    const didGameJustEnd = !previousIsGameOver.current && isGameOver;
    previousIsGameOver.current = isGameOver;

    if (
      !didGameJustEnd ||
      suppressEndGameModal ||
      isEndGameModalDismissed
    ) {
      return;
    }
    const delayModalOpen = window.setTimeout(() => {
      setIsEndGameModalOpen(true);
    }, 250);

    return () => window.clearTimeout(delayModalOpen);
  }, [isGameOver, suppressEndGameModal, isEndGameModalDismissed]);

  React.useEffect(() => {
    if (isGameOver) {
      savePlayedPuzzleToLocalStorage(puzzleId);
      recordCompletedPuzzleStats({
        puzzleKey: puzzleId,
        isGameWon,
        numMistakesUsed,
      });
    }
  }, [isGameOver, isGameWon, numMistakesUsed]);

  function handleEndGameModalOpenChange(nextOpen) {
    setIsEndGameModalOpen(nextOpen);

    if (!nextOpen && isGameOver) {
      saveDismissedEndGameResultToLocalStorage(puzzleId);
      setIsEndGameModalDismissed(true);
    }
  }

  return (
    <>
      <h3 className="font-serif italic text-text-soft text-center mt-4">
        Aimsigh {numCategories} ghrúpa de {categorySize} fhocal
      </h3>

      <div className={`game-wrapper`}>
        {isGameOver && isGameWon ? (
          <GameWonModal
            open={isEndGameModalOpen}
            submittedGuesses={submittedGuesses}
            onOpenChange={handleEndGameModalOpenChange}
          />
        ) : (
          <GameLostModal
            open={isEndGameModalOpen}
            submittedGuesses={submittedGuesses}
            onOpenChange={handleEndGameModalOpenChange}
          />
        )}
        <GameGrid
          gameRows={shuffledRows}
          showEnglishTranslations={showEnglishTranslations}
          shouldGridShake={gridShake}
          setShouldGridShake={setGridShake}
        />
        <Separator />

        {!isGameOver ? (
          <>
            <NumberOfMistakesDisplay />
            <GameControlButtonsPanel
              shuffledRows={shuffledRows}
              setShuffledRows={setShuffledRows}
              setGridShake={setGridShake}
            />
          </>
        ) : (
          <div className="grid gap-3">
            <ViewResultsModal
              initiallyOpen={wasGameOverOnLoad && !suppressEndGameModal}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Game;
