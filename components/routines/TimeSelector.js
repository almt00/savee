import { styled } from "@stitches/react";
import React from "react";

export default function TimeSelector() {
  return (
    <>
      <p>Quanto tempo demoras em média?</p>

      <form className={`flex gap-6 justify-center text-center p-3 mt-4`}>
        <div className="border-b-2 border-purple">
          <p className="text-muted" id="hr">hr</p>
          <Input
            aria-describedby="hr"
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={24}
          />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted" id="min">min</p>
          <Input
            aria-describedby="min"
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={60}
          />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted" id="sec">sec</p>
          <Input
            aria-describedby="sec"
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
  fontSize: "$h1",
  fontWeight: "$bolder",
});
