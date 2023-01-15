import { styled } from "@stitches/react";

const Background = styled("div", {
  position: "absolute",
  zIndex: "-100",
  width: "100vw",
  height: "35%",
  borderBottomRightRadius: "0.75rem",
  borderBottomLeftRadius: "0.75rem",
  backgroundColor: "$mint",
  variants: {
    color: {
      mint: {
        backgroundColor: "$mint",
      },
      skyblue: {
        backgroundColor: "$skyblue",
      },
      yellow: {
        backgroundColor: "$yellow",
      },
      purple: {
        backgroundColor: "$purple",
      },
      cyan: {
        backgroundColor: "$cyan",
      },
      salmon: {
        backgroundColor: "$salmon",
      },
      orange: {
        backgroundColor: "$orange",
      },
      deeppurple: {
        backgroundColor: "$deeppurple",
      },
    },
  },
});

export default Background;
