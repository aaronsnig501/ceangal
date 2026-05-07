import React from "react";
import { generateDifficultyGrid } from "../../lib/game-helpers";

const cellClassByDifficulty = {
  1: "bg-tier-1",
  2: "bg-tier-2",
  3: "bg-tier-3",
  4: "bg-tier-4",
};

function ResultMap({ gameData, submittedGuesses }) {
  const rows = generateDifficultyGrid(gameData, submittedGuesses);

  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto my-4 grid w-full max-w-[180px] gap-1">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-1">
          {row.map((difficulty, cellIndex) => (
            <span
              key={`${rowIndex}-${cellIndex}`}
              className={`h-5 rounded-[4px] ${
                cellClassByDifficulty[difficulty] ?? "bg-rule"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResultMap;
