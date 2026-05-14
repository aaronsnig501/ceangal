import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { shareStatus } from "../../lib/share-game";
import { GameStatusContext } from "../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { trackEvent } from "../../lib/analytics";
import { puzzleId, puzzleIndex, puzzleTitle } from "../../lib/time-utils";

function ShareScoreButton({ buttonText = "Roinn", className = "" }) {
  const { gameData } = React.useContext(PuzzleDataContext);
  const { submittedGuesses, isGameWon, numMistakesUsed } =
    React.useContext(GameStatusContext);
  const { toast } = useToast();
  function handleShareToClipboard() {
    toast({
      label: "Notification",
      title: "",
      description: "Cóipeálaḋ é.",
    });
  }
  function handleShareFailure() {
    toast({
      label: "Notification",
      title: "",
      description: "Níorḃ ḟéidir é a roinnt.",
    });
  }
  return (
    <Button
      className={cn("w-full", className)}
      variant="share"
      onClick={() => {
        trackEvent("Share Result", {
          props: {
            puzzle_id: String(puzzleId),
            puzzle_index: String(puzzleIndex),
            puzzle_title: puzzleTitle,
            result: isGameWon ? "win" : "loss",
            mistakes: String(numMistakesUsed),
          },
        });

        shareStatus(
          gameData,
          submittedGuesses,
          isGameWon,
          numMistakesUsed,
          handleShareToClipboard,
          handleShareFailure,
          true
        );
      }}
    >
      {buttonText}
    </Button>
  );
}

export default ShareScoreButton;
