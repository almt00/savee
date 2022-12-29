import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    fonts: {
      system: "Inter, apple-system, sans-serif",
    },
    colors: {
      black: "#081B33",
      white: "#FFFFFF",
      links: "#4C79EC",
      border: "#EBEBEB",
      muted: "#B0B0B0",
      success: "#35A361",
      danger: "#D63535",
      mint: "#C4F4D4",
      skyblue: "#C5E1F2",
      yellow: "#FCF7B9",
      purple: "#E8C3F3",
      cyan: "#C4F3E5",
      salmon: "#FCB9B9",
      orange: "#FCD9B9",
      deeppurple: "#BEB9FC",
    },
    fontSizes: {
      f0: "40x",
      h1: "32px",
      h2: "24px",
      h3: "20px",
      h4: "16px",
      normal: "14px",
      small: "12px",
    },
    fontWeights: {
      bold: "600",
      bolder: "700",
      normal: "400",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
  },
});
