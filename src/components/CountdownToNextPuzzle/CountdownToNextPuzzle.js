import React from "react";
import Countdown from "react-countdown";
import { dateOfNextPuzzle } from "../../lib/time-utils";

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  //ChatGPT Assisted
  // Render a countdown
  if (completed) {
    return (
      <span className="font-[600]">
        Tá cluiċe nua ar fáil. Aṫnuaigh an leaṫanaċ.
      </span>
    );
  }
  const timeParts = [];

  if (days > 0) {
    timeParts.push(`${days} lá`);
  }
  if (hours > 0) {
    timeParts.push(`${hours} uair`);
  }
  if (minutes > 0) {
    timeParts.push(`${minutes} nóiméad`);
  }

  // Create a sentence based on the time parts
  let timeLeftString = "An ċéad dúṡlán eile i ";
  if (timeParts.length > 2) {
    timeLeftString += timeParts.slice(0, -1).join(", ");
    timeLeftString += `, ⁊ ${timeParts.slice(-1)}`;
  } else if (timeParts.length == 2) {
    timeLeftString += `${timeParts[0]} ⁊ ${timeParts[1]}`;
  } else {
    timeLeftString += timeParts[0];
  }
  // Create a sentence based on the time parts

  return <div>{timeLeftString}</div>;
};

function CountdownToNextPuzzle() {
  return (
    <div className="flex flex-row place-content-center mt-4 font-serif italic text-text-soft">
      <Countdown
        className="text-base"
        renderer={renderer}
        date={dateOfNextPuzzle}
        intervalDelay={1000}
      />
    </div>
  );
}

export default CountdownToNextPuzzle;
