import React from "react";
import * as styles from "./WordButton.module.css";

import { GuessCandidateContext } from "../../providers/GameStatusProvider";

function WordButton({
  word,
  translation,
  fullCandidateSize,
  showEnglishTranslation = false,
}) {
  const { guessCandidate, setGuessCandidate } =
    React.useContext(GuessCandidateContext);
  const isSelected = guessCandidate.includes(word);
  const isCandidateListFull = guessCandidate.length >= fullCandidateSize;

  function handlePressedChange(nextPressed) {
    setGuessCandidate((currentGuessCandidate) => {
      const isAlreadySelected = currentGuessCandidate.includes(word);

      if (nextPressed) {
        if (isAlreadySelected || currentGuessCandidate.length >= fullCandidateSize) {
          return currentGuessCandidate;
        }

        return [...currentGuessCandidate, word];
      }

      if (!isAlreadySelected) {
        return currentGuessCandidate;
      }

      return currentGuessCandidate.filter((candidateWord) => candidateWord !== word);
    });
  }

  function handlePress(event) {
    event.preventDefault();
    handlePressedChange(!isSelected);
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
    <button
      type="button"
      className={`${styles.growShrink} ${
        showEnglishTranslation ? styles.withTranslation : ""
      } select-none`}
      data-state={isSelected ? "on" : "off"}
      onPointerDown={handlePress}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handlePress(event);
        }
      }}
      onContextMenu={(event) => event.preventDefault()}
      disabled={!isSelected && isCandidateListFull}
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
    </button>
  );
}

export default React.memo(WordButton);
