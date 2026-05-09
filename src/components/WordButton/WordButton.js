import React from "react";
import * as styles from "./WordButton.module.css";
import { Toggle } from "../ui/toggle";

import { GameStatusContext } from "../../providers/GameStatusProvider";

function WordButton({
  word,
  translation,
  fullCandidateSize,
  showEnglishTranslation = false,
}) {
  const { guessCandidate, setGuessCandidate } =
    React.useContext(GameStatusContext);
  const [isSelected, setIsSelected] = React.useState(
    !!guessCandidate.includes(word)
  );

  const isCandidateListFull = guessCandidate.length == fullCandidateSize;

  React.useEffect(() => {
    setIsSelected(!!guessCandidate.includes(word));
  }, [guessCandidate]);

  function flipSelection() {
    if (isSelected) {
      // remove from candidateGuess
      const updatedGuessCandidate = guessCandidate.filter((w) => {
        return w !== word;
      });
      setGuessCandidate(updatedGuessCandidate);
      // set state to *not* selected
      setIsSelected(false);
    } else {
      // check if the candidate array is full
      if (!isCandidateListFull) {
        // add to candidateGuess array
        setGuessCandidate([...guessCandidate, word]);
        // set state to *selected*
        setIsSelected(true);
      }
    }
  }

  //const fontSizeByWordLength = 9characters works with 0.6rem

  function getFontSize(word) {
    const baseLength = 7;
    const wordLength = word.length;
    let fontSize = 1;
    if (wordLength > baseLength) {
      const numExtraChars = wordLength - baseLength;
      fontSize = fontSize - numExtraChars * 0.1;
      fontSize = Math.max(0.5, fontSize);
      return `${fontSize}em`;
    } else {
      return null;
    }
  }
  // word = "washingtonian";
  return (
    <Toggle
      className={`${styles.growShrink} ${
        showEnglishTranslation ? styles.withTranslation : ""
      } select-none`}
      variant="outline"
      pressed={isSelected}
      onClick={flipSelection}
      aria-pressed={isSelected}
    >
      <span className={styles.wordStack}>
        <span style={{ fontSize: getFontSize(word) }} className={styles.wordText}>
          {word}
        </span>
        {showEnglishTranslation && translation && (
          <span className={styles.translationText}>{translation}</span>
        )}
      </span>
      <span className={styles.selectedDot} aria-hidden="true" />
    </Toggle>
  );
}

export default WordButton;
