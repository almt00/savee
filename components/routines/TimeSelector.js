import { styled } from "@stitches/react";
import React from "react";

export default function TimeSelector() {
  return (
    <>
      <form className={`flex gap-6 justify-center text-center p-3 mt-6`}>
        <div className="border-b-2 border-purple">
          <p className="text-muted">hr</p>
          <Input
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={24}
          />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted">min</p>
          <Input
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={60}
            required
          />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted">sec</p>
          <Input
            type="number"
            placeholder="00"
            maxLength="2"
            min={0}
            max={60}
            required
          />
        </div>
      </form>
    </>
  );
}

const Input = styled("input", {
  "-webkit-appearance": "none",
  maxWidth: "3rem",
  height: "3rem",
  fontSize: "$h1",
  fontWeight: "$bolder",
});
