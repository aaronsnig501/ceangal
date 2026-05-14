import React from "react";
import { range } from "../../lib/utils";
import { MAX_MISTAKES } from "../../lib/constants";
import { GameStatusContext } from "../../providers/GameStatusProvider";

function SingleMistakeDisplay({ isUsed }) {
  return (
    <span
      className={`h-2.5 w-2.5 rounded-full border border-rule ${
        isUsed ? "bg-char border-char" : "bg-transparent"
      }`}
      aria-hidden="true"
    />
  );
}

function NumberOfMistakesDisplay() {
  const { numMistakesUsed } = React.useContext(GameStatusContext);
  // array size of number of guess. [1, 2, 3, 4]
  const mistakeRange = range(MAX_MISTAKES);
  return (
    <div className="flex flex-row gap-x-2 justify-center items-center text-text-soft">
      <p className="font-serif italic text-sm mr-2">Botúin fágṫa</p>
      {mistakeRange.map((el) => (
        <SingleMistakeDisplay key={el} isUsed={el < numMistakesUsed} />
      ))}
    </div>
  );
}

export default NumberOfMistakesDisplay;
