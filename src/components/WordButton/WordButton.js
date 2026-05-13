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

  function getWordLengthVariant(value) {
    if (value.length >= 18) {
      return "xlong";
    }

    if (value.length >= 13) {
      return "long";
    }

    return "default";
  }

  const wordLengthVariant = getWordLengthVariant(word);
  // word = "washingtonian";
  return (
    <button
      type="button"
      className={`${styles.growShrink} ${
        showEnglishTranslation ? styles.withTranslation : ""
      } select-none`}
      data-state={isSelected ? "on" : "off"}
      data-word-length={wordLengthVariant}
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
        <span className={styles.wordText}>
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
