import React from "react";
import BaseModal from "../BaseModal";

import ShareScoreButton from "../../ShareScoreButton";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";
import ResultMap from "../../ResultMap";

function GameWonModal({ open, submittedGuesses }) {
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title="Tá sé agat!"
      initiallyOpen={open}
      footerElements={<ShareScoreButton />}
      showActionButton={false}
    >
      <p className="text-center italic">Réiteach deas. Roinn do thoradh.</p>
      <div className="justify-center">
        <ResultMap gameData={gameData} submittedGuesses={submittedGuesses} />
        <CountdownToNextPuzzle />
      </div>
    </BaseModal>
  );
}

export default GameWonModal;
