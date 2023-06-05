import { styled } from "@stitches/react";
import React from "react";

export default function TimeSelector({ updateValue }) {
  const handleCalculateClick = () => {
    const hourValue =
      parseInt(document.getElementById("hourInput").value, 10) || 0;
    const minuteValue =
      parseInt(document.getElementById("minuteInput").value, 10) || 0;
    const secondValue =
      parseInt(document.getElementById("secondInput").value, 10) || 0;

    // convert hours to seconds
    const hoursToSeconds = hourValue * 3600;
    // convert minutes to seconds
    const minutesToSeconds = minuteValue * 60;
    // add all seconds
    const totalSeconds = hoursToSeconds + minutesToSeconds + secondValue;
    updateValue("duration_routine", totalSeconds);
  };

  return (
    <>
      <p>Quanto tempo demoras em média?</p>

      <form className={`flex gap-6 justify-center text-center p-3 mt-4`}>
        <div className="border-b-2 border-purple">
          <p className="text-muted" id="h">
            h
          </p>
          <Input
            id="hourInput"
            aria-describedby="h"
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={24}
            onChange={handleCalculateClick}
          />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted" id="min">
            min
          </p>
          <Input
            id="minuteInput"
            aria-describedby="min"
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={60}
            onChange={handleCalculateClick}
          />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted" id="seg">
            seg
          </p>
          <Input
            id="secondInput"
            aria-describedby="seg"
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={60}
            onChange={handleCalculateClick}
          />
        </div>
      </form>
    </>
  );
}

const Input = styled("input", {
  "-webkit-appearance": "none",
  maxWidth: "4rem",
  textAlign: "center",
  height: "3rem",
  fontSize: "$xxlargeheading",
  fontWeight: "$bolder",
});
