import React from "react";
import * as styles from "./WordButton.module.css";

import { GuessCandidateContext } from "../../providers/GameStatusProvider";
import { triggerTileHaptic } from "../../lib/haptics";

function WordButton({
  word,
  translation,
  fullCandidateSize,
  showEnglishTranslation = false,
}) {
  const buttonRef = React.useRef(null);
  const stackRef = React.useRef(null);
  const wordRef = React.useRef(null);
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

        triggerTileHaptic();
        return [...currentGuessCandidate, word];
      }

      if (!isAlreadySelected) {
        return currentGuessCandidate;
      }

      triggerTileHaptic();
      return currentGuessCandidate.filter((candidateWord) => candidateWord !== word);
    });
  }

  function handlePress(event) {
    event.preventDefault();
    handlePressedChange(!isSelected);
  }

  React.useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      !buttonRef.current ||
      !stackRef.current ||
      !wordRef.current
    ) {
      return undefined;
    }

    const buttonElement = buttonRef.current;
    const stackElement = stackRef.current;
    const wordElement = wordRef.current;
    let animationFrameId = null;
    let cancelled = false;

    function fitWordToTile() {
      wordElement.style.fontSize = "";

      const availableHeight = Math.max(buttonElement.clientHeight - 10, 0);
      const availableWidth = stackElement.clientWidth;

      if (availableWidth === 0) return;

      let currentSize = parseFloat(window.getComputedStyle(wordElement).fontSize);
      const minimumSize = 6;

      while (currentSize > minimumSize) {
        const stackOverflows = stackElement.scrollHeight > availableHeight;

        // Use Range.getClientRects() for reliable text width measurement on Android —
        // scrollWidth can be reported as constrained when a parent clips overflow.
        const range = document.createRange();
        range.selectNodeContents(wordElement);
        const rects = range.getClientRects();
        let wordOverflows = false;
        for (const rect of rects) {
          if (rect.width > availableWidth) {
            wordOverflows = true;
            break;
          }
        }

        if (!stackOverflows && !wordOverflows) break;

        currentSize -= 0.5;
        wordElement.style.fontSize = `${currentSize}px`;
      }
    }

    function scheduleFit() {
      if (cancelled) {
        return;
      }

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = window.requestAnimationFrame(() => {
          fitWordToTile();
        });
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      scheduleFit();
    });

    resizeObserver.observe(buttonElement);
    resizeObserver.observe(stackElement);
    scheduleFit();

    const fontSet = document.fonts;
    let removeFontListener = null;

    if (fontSet) {
      fontSet.ready.then(() => {
        scheduleFit();
      });

      if (typeof fontSet.addEventListener === "function") {
        const handleFontLoad = () => {
          scheduleFit();
        };

        fontSet.addEventListener("loadingdone", handleFontLoad);
        removeFontListener = () => {
          fontSet.removeEventListener("loadingdone", handleFontLoad);
        };
      }
    }

    return () => {
      cancelled = true;

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      removeFontListener?.();
      resizeObserver.disconnect();
    };
  }, [showEnglishTranslation, translation, word]);

  return (
    <button
      ref={buttonRef}
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
      <span ref={stackRef} className={styles.wordStack}>
        <span ref={wordRef} className={styles.wordText}>
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
