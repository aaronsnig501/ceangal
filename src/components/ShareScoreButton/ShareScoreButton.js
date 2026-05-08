import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { shareStatus } from "../../lib/share-game";
import { GameStatusContext } from "../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";

function ShareScoreButton({ buttonText = "Roinn", className = "" }) {
  const { gameData } = React.useContext(PuzzleDataContext);
  const { submittedGuesses, isGameWon, numMistakesUsed } =
    React.useContext(GameStatusContext);
  const { toast } = useToast();
  function handleShareToClipboard() {
    toast({
      label: "Notification",
      title: "",
      description: "Cóipeáladh é.",
    });
  }
  function handleShareFailure() {
    toast({
      label: "Notification",
      title: "",
      description: "Níorbh fhéidir é a roinnt.",
    });
  }
  return (
    <Button
      className={cn("w-full", className)}
      variant="share"
      onClick={() =>
        shareStatus(
          gameData,
          submittedGuesses,
          isGameWon,
          numMistakesUsed,
          handleShareToClipboard,
          handleShareFailure,
          true
        )
      }
    >
      {buttonText}
    </Button>
  );
}

export default ShareScoreButton;
