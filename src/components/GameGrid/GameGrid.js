import React from "react";

import WordButton from "../WordButton";

import * as styles from "./GameGrid.module.css";

import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { GameStatusContext } from "../../providers/GameStatusProvider";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

function WordRow({ words }) {
  return (
    <div className="grid grid-cols-4 gap-1.5 min-[380px]:gap-2">
      {words.map((word) => (
        <WordButton key={word} word={word} fullCandidateSize={words.length} />
      ))}
    </div>
  );
}

export function SolvedWordRow({ ...props }) {
  const tierClassMap = {
    1: styles.tier1,
    2: styles.tier2,
    3: styles.tier3,
    4: styles.tier4,
  };

  const [hasBeenClicked, setHasBeenClicked] = React.useState(false);
  const isImageAvailable = props.imageSrc != null;
  const cardClassName = `${styles.solvedCard} ${
    tierClassMap[props.difficulty] ?? styles.tier1
  }`;

  const cardContent = (
    <>
      <p className={styles.solvedLabel}>Leibhéal {props.difficulty}</p>
      <p className={styles.solvedTitle}>{props.category}</p>
      <p className={styles.solvedWords}>{props.words.join(", ")}</p>
    </>
  );

  return (
    <div className={styles.solvedReveal}>
      {!isImageAvailable ? (
        <div className={cardClassName}>{cardContent}</div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={`${cardClassName} cursor-pointer shadow-md`}
              onClick={() => setHasBeenClicked(true)}
            >
              {!hasBeenClicked && (
                <Badge className={styles.solvedBadge}>
                  Féach
                </Badge>
              )}
              {cardContent}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <img src={props.imageSrc} />
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

function GameGrid({ gameRows, shouldGridShake, setShouldGridShake }) {
  const { submittedGuesses, isGameOver, isGameWon, solvedGameData } =
    React.useContext(GameStatusContext);

  const { gameData } = React.useContext(PuzzleDataContext);

  React.useEffect(() => {
    const shakeEffect = window.setTimeout(() => {
      setShouldGridShake(false);
    }, 450);

    // cleanup timeout
    return () => window.clearTimeout(shakeEffect);
  }, [submittedGuesses]);

  const isGameOverAndLost = isGameOver && !isGameWon;
  const isGameOverAndWon = isGameOver && isGameWon;
  const isGameActive = !isGameOver;
  const isGameActiveWithAnySolvedRows =
    isGameActive && solvedGameData.length > 0;

  return (
    <div>
      {(isGameOverAndWon || isGameActiveWithAnySolvedRows) && (
        <div className="grid gap-y-2 pb-2">
          {solvedGameData.map((solvedRowObj) => (
            <SolvedWordRow key={solvedRowObj.category} {...solvedRowObj} />
          ))}
        </div>
      )}
      {isGameActive && (
        <div
          className={`grid gap-y-1.5 min-[380px]:gap-y-2 ${
            shouldGridShake ? styles.shake : ""
          }`}
        >
          {gameRows.map((row, idx) => (
            <WordRow key={idx} words={row} />
          ))}
        </div>
      )}
      {/* Show correct answers here after the game is over if they lost */}
      {isGameOverAndLost && (
        <div className="grid gap-y-2 pb-2">
          <p className="font-serif italic text-text-soft">
            Seo iad na grúpaí cearta.
          </p>
          {gameData.map((obj) => (
            <SolvedWordRow key={obj.category} {...obj} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GameGrid;
