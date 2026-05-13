import React from "react";
import { Check, ChevronRight, X } from "lucide-react";
import { allPuzzles } from "../../lib/data";
import { loadCompletedPuzzlesFromLocalStorage } from "../../lib/local-storage";
import {
  getDefaultPuzzleIndex,
  puzzleIndex,
  setPuzzleIndex,
} from "../../lib/time-utils";
import { trackEvent } from "../../lib/analytics";

function PuzzleBrowser({ open, onOpenChange }) {
  const [completedPuzzles, setCompletedPuzzles] = React.useState([]);
  const currentPuzzleIndex = puzzleIndex % allPuzzles.length;
  const recommendedPuzzleIndex = getDefaultPuzzleIndex();

  React.useEffect(() => {
    if (open) {
      setCompletedPuzzles(loadCompletedPuzzlesFromLocalStorage());
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function handleSelectPuzzle(index) {
    const selectedPuzzle = allPuzzles[index];

    trackEvent("Puzzle Browser Select", {
      props: {
        puzzle_id: String(selectedPuzzle.id),
        puzzle_index: String(index),
        puzzle_title: selectedPuzzle.title,
      },
    });
    onOpenChange(false);
    setPuzzleIndex(index);
  }

  const orderedPuzzles = allPuzzles
    .map((puzzle, index) => ({
      puzzle,
      index,
      isCompleted: completedPuzzles.includes(puzzle.id),
    }))
    .sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      return a.index - b.index;
    });

  return (
    <div className="fixed inset-0 z-[80] bg-background text-char">
      <div className="mx-auto flex h-full w-full max-w-[560px] flex-col px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pt-[calc(1rem+env(safe-area-inset-top,0px))]">
        <div className="flex min-h-14 items-center justify-between border-b border-rule">
          <div>
            <h2 className="font-display text-2xl font-bold">Roghnaigh Imirt</h2>
            <p className="font-serif text-sm italic text-text-soft">
              Roghnaigh puzal ar bith.
            </p>
          </div>
          <button
            type="button"
            className="icon-trigger"
            onClick={() => onOpenChange(false)}
            aria-label="Dún"
          >
            <X strokeWidth={1.75} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-3">
          <div className="grid gap-2">
            {orderedPuzzles.map(({ puzzle, index, isCompleted }) => {
              const isCurrent = index === currentPuzzleIndex;
              const isRecommended = index === recommendedPuzzleIndex;

              return (
                <button
                  key={puzzle.id}
                  type="button"
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border p-3 text-left transition ${
                    isCurrent
                      ? "border-vermil bg-accent"
                      : isRecommended
                        ? "border-rule bg-background hover:border-vermil"
                        : "border-rule bg-surface hover:border-vermil"
                  } ${isCompleted && !isCurrent ? "opacity-70" : ""}
                  ${
                    isRecommended && !isCurrent
                      ? "shadow-[inset_0_0_0_1px_rgba(200,56,26,0.12)]"
                      : ""
                  }`}
                  onClick={() => handleSelectPuzzle(index)}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-bold ${
                      isCurrent
                        ? "border-vermil bg-vermil text-cream"
                        : "border-rule text-text-soft"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-display text-lg font-bold leading-tight">
                      {puzzle.title}
                      {isCompleted && (
                        <Check
                          className="shrink-0 text-vermil"
                          size={16}
                          strokeWidth={2}
                        />
                      )}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {isRecommended && (
                        <span className="rounded-full border border-vermil px-2 py-0.5 text-xs font-semibold text-vermil">
                          Ar aghaidh
                        </span>
                      )}
                      {isCompleted && (
                        <span className="rounded-full border border-rule px-2 py-0.5 text-xs font-semibold text-text-soft">
                          Críochnaithe
                        </span>
                      )}
                    </span>
                  </span>
                  <ChevronRight
                    className={isCurrent ? "text-vermil" : "text-text-soft"}
                    size={18}
                    strokeWidth={1.75}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PuzzleBrowser;
