import React from "react";

import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import ShareScoreButton from "../../ShareScoreButton";
import BaseModal from "../BaseModal";
import { GameStatusContext } from "../../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";
import { Button } from "../../ui/button";
import ResultMap from "../../ResultMap";

function ViewResultsModal({ initiallyOpen = false }) {
  const { submittedGuesses } = React.useContext(GameStatusContext);
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title=""
      trigger={
        <Button
          variant="submit"
          className="w-full"
          children={"Féach ar an toradh"}
        />
      }
      initiallyOpen={initiallyOpen}
      showActionButton={false}
      footerElements={<ShareScoreButton buttonText={"Roinn do scór"} />}
    >
      <div className="flex flex-col place-content-center">
        <p className="text-center font-serif italic text-text-soft">
          Seo léarscáil do roghanna
        </p>
        <ResultMap gameData={gameData} submittedGuesses={submittedGuesses} />
        <CountdownToNextPuzzle />
      </div>
    </BaseModal>
  );
}

export default ViewResultsModal;
