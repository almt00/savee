import { styled } from "@stitches/react";
import React from "react";
import { useEffect, useState } from "react";

export default function TimeSelector({ updateValue, isButtonClicked }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleCalculateClick = () => {
    const hourValue =
      parseInt(document.getElementById("hourInput").value, 10) || 0;
    const minuteValue =
      parseInt(document.getElementById("minuteInput").value, 10) || 0;
    const secondValue =
      parseInt(document.getElementById("secondInput").value, 10) || 0;
    setHours(hourValue);
    setMinutes(minuteValue);
    setSeconds(secondValue);

    // convert hours to seconds
    const hoursToSeconds = hourValue * 3600;
    // convert minutes to seconds
    const minutesToSeconds = minuteValue * 60;
    // add all seconds
    const totalSeconds = hoursToSeconds + minutesToSeconds + secondValue;
    updateValue("duracao", totalSeconds);
  };

  useEffect(() => {
    if (isButtonClicked) {
      handleCalculateClick();
    }
  }, [isButtonClicked]);

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
