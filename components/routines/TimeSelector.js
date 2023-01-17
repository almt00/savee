import { styled } from "@stitches/react";
import React from "react";
import Button from "../elements/Button";


export default function TimeSelector() {
  return (
    <>
        <input
          type="time"
          id="time"
          min="00:01:00"
          max="24:00:00"
          className="w-full border-0"
          step={1}
          required
        ></input>
      <div className={`flex gap-6 justify-center text-center p-3 mt-6`}>
        <div className="border-b-2 border-purple">
          <p className="text-muted">hr</p>
          <Input type="number" placeholder="00" maxLength="2" min={0} max={24} />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted">min</p>
          <h1>00</h1>
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted">sec</p>
          <h1>00</h1>
        </div>
      </div>
      <form className={`flex gap-6 justify-center text-center p-3 mt-6`}>
        <div className="border-b-2 border-purple">
          <p className="text-muted">hr</p>
          <Input type="number" placeholder="00" maxLength="2" min={0} max={24} />
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted">min</p>
          <Input type="number" placeholder="00" maxLength="2" min={0} max={60} required/>
        </div>
        <div className="border-b-2 border-purple">
          <p className="text-muted">sec</p>
          <Input type="number" placeholder="00" maxLength="2" min={0} max={60} required/>
        </div>
        <Button type="submit" >teste</Button>
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
