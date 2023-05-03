import React, { useState } from "react";
import { styled } from "@stitches/react";
import Menu from "./Menu";

const HeaderSection = styled("div", {
  backgroundColor: "transparent",
  padding: "0.625rem 1.5rem",
  position: "absolute",
  width: "100vw",
});
const H1 = styled("h1",{
  fontSize: "$smallheading",
  fontWeight: "$bolder",
})


export default function Header(props) {
  const openMenu = function (e) {
    let menu = document.getElementById("menu");
    let overlay = document.getElementById("menu_overlay");
    menu.style.transform = "translate(0%)";
    menu.style.transition = "0.3s ease-in";
    overlay.style.transform = "translate(0%)";
    document.documentElement.style.overflow = "hidden";
  };
  return (
    <>
      <HeaderSection
        id="header"
        className="flex items-center justify-between z-10"
      >
        <div className="bg-white p-2 rounded-full" onClick={openMenu}>
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
        <H1 id="main">{props.page}</H1>
        <div></div>
      </HeaderSection>
      <Menu></Menu>
    </>
  );
}
