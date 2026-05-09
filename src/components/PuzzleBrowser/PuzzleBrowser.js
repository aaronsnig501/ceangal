import React from "react";
import { Check, ChevronRight, X } from "lucide-react";
import { allPuzzles } from "../../lib/data";
import { loadPlayedPuzzlesFromLocalStorage } from "../../lib/local-storage";
import {
  getIndex,
  getLastGameDate,
  getToday,
  puzzleIndex,
  setPuzzleIndex,
} from "../../lib/time-utils";

function PuzzleBrowser({ open, onOpenChange }) {
  const [playedPuzzles, setPlayedPuzzles] = React.useState([]);
  const todaysPuzzleIndex = getIndex(getLastGameDate(getToday()));

  React.useEffect(() => {
    if (open) {
      setPlayedPuzzles(loadPlayedPuzzlesFromLocalStorage());
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function handleSelectPuzzle(index) {
    onOpenChange(false);
    setPuzzleIndex(index);
  }

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
            {allPuzzles.map((puzzle, index) => {
              const isToday = index === todaysPuzzleIndex;
              const isCurrent = index === puzzleIndex;
              const isPlayed = playedPuzzles.includes(index);

              return (
                <button
                  key={puzzle.id}
                  type="button"
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border p-3 text-left transition ${
                    isCurrent
                      ? "border-vermil bg-accent"
                      : "border-rule bg-surface hover:border-vermil"
                  } ${isPlayed && !isCurrent ? "opacity-70" : ""}`}
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
                    <span className="block font-display text-lg font-bold leading-tight">
                      {puzzle.title}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {isToday && (
                        <span className="rounded-full border border-vermil px-2 py-0.5 text-xs font-semibold text-vermil">
                          Inniu
                        </span>
                      )}
                      {isPlayed && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rule px-2 py-0.5 text-xs font-semibold text-text-soft">
                          <Check size={12} /> Imeartha
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
