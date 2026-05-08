import React from "react";
import BaseModal from "../BaseModal";
import ShareScoreButton from "../../ShareScoreButton";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";
import ResultMap from "../../ResultMap";
import { Button } from "../../ui/button";
import {
  periodInDays,
  puzzleGameDate,
  setGameDate,
} from "../../../lib/time-utils";
import { addDays } from "date-fns";

function GameLostModal({ open, submittedGuesses }) {
  const { gameData } = React.useContext(PuzzleDataContext);

  function handlePlayNextPuzzle() {
    setGameDate(addDays(puzzleGameDate, periodInDays));
  }

  return (
    <BaseModal
      title="An chéad uair eile..."
      initiallyOpen={open}
      contentClassName="top-auto bottom-0 translate-y-0 w-full max-w-[520px] rounded-b-none rounded-t-[18px] border-b-0 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-top-0"
      footerClassName="flex-col gap-2 sm:flex-col"
      footerElements={
        <>
          <ShareScoreButton className="basis-auto" />
          <Button
            className="w-full"
            variant="secondary"
            onClick={handlePlayNextPuzzle}
          >
            Imirt eile
          </Button>
        </>
      }
      showActionButton={false}
    >
      <div className="grid gap-3 text-center">
        <p className="font-serif italic text-base text-center text-text-soft">
          Seo do thoradh.
        </p>
        <ResultMap gameData={gameData} submittedGuesses={submittedGuesses} />
      </div>
    </BaseModal>
  );
}

export default GameLostModal;
