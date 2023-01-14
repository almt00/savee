import React from "react";
import { styled } from "@stitches/react";

const HeaderSection = styled("div", {
  backgroundColor: "transparent",
  padding: "0.625rem 1.5rem",
  position: "absolute",
  width: "100vw",
});

export default function Header(props) {
  return (
    <>
      <HeaderSection
        id="header"
        className="flex items-center justify-between z-10"
      >
        <div className="bg-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <h4>{props.page}</h4>
        <div></div>
      </HeaderSection>
    </>
  );
}
