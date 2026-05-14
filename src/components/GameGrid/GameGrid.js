import React from "react";
import { Loader2, Volume2 } from "lucide-react";

import WordButton from "../WordButton";

import * as styles from "./GameGrid.module.css";

import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { GameStatusContext } from "../../providers/GameStatusProvider";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import {
  canPlayPronunciation,
  playPronunciation,
} from "../../lib/pronunciation";

function WordRow({ words, translations, showEnglishTranslations }) {
  return (
    <div className="grid grid-cols-4 gap-1.5 min-[380px]:gap-2">
      {words.map((word) => (
        <WordButton
          key={word}
          word={word}
          translation={translations[word]}
          fullCandidateSize={words.length}
          showEnglishTranslation={showEnglishTranslations}
        />
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
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const isImageAvailable = props.imageSrc != null;
  const pronunciationSources = props.pronunciations ?? props._pronunciations ?? {};
  const hasPronunciation = canPlayPronunciation({
    words: props.words,
    audioSourcesByWord: pronunciationSources,
  });
  const cardClassName = `${styles.solvedCard} ${
    tierClassMap[props.difficulty] ?? styles.tier1
  }`;

  async function handlePlayPronunciation(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!hasPronunciation || isAudioPlaying) {
      return;
    }

    try {
      setIsAudioPlaying(true);
      await playPronunciation({
        words: props.words,
        audioSourcesByWord: pronunciationSources,
      });
    } catch (error) {
      // Ignore failed playback and leave the card usable.
    } finally {
      setIsAudioPlaying(false);
    }
  }

  const cardContent = (
    <>
      <p className={styles.solvedLabel}>Leibḣéal {props.difficulty}</p>
      <p className={styles.solvedTitle}>{props.category}</p>
      <p className={styles.solvedWords}>{props.words.join(", ")}</p>
      {hasPronunciation && (
        <button
          type="button"
          className={styles.audioButton}
          onPointerDown={handlePlayPronunciation}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handlePlayPronunciation(event);
            }
          }}
          aria-label={`Seinn fuaim do ${props.category}`}
          aria-pressed={isAudioPlaying}
        >
          {isAudioPlaying ? (
            <Loader2 className={styles.audioIconSpin} size={16} strokeWidth={1.8} />
          ) : (
            <Volume2 size={16} strokeWidth={1.8} />
          )}
          <span>Fuaim</span>
        </button>
      )}
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
                  Féaċ
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

function GameGrid({
  gameRows,
  showEnglishTranslations,
  shouldGridShake,
  setShouldGridShake,
}) {
  const { submittedGuesses, isGameOver, isGameWon, solvedGameData } =
    React.useContext(GameStatusContext);

  const { gameData } = React.useContext(PuzzleDataContext);
  const translations = React.useMemo(() => {
    return gameData.reduce((translationMap, group) => {
      Object.assign(
        translationMap,
        group._translations ?? group.translations ?? {}
      );
      return translationMap;
    }, {});
  }, [gameData]);

  React.useEffect(() => {
    if (!shouldGridShake) {
      return undefined;
    }

    const shakeEffect = window.setTimeout(() => {
      setShouldGridShake(false);
    }, 450);

    // cleanup timeout
    return () => window.clearTimeout(shakeEffect);
  }, [shouldGridShake, setShouldGridShake]);

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
            <WordRow
              key={idx}
              words={row}
              translations={translations}
              showEnglishTranslations={showEnglishTranslations}
            />
          ))}
        </div>
      )}
      {/* Show correct answers here after the game is over if they lost */}
      {isGameOverAndLost && (
        <div className="grid gap-y-2 pb-2">
          <p className="font-serif italic text-text-soft">
            Seo iad na gṙúpaí cearta.
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
