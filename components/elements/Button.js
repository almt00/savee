import { styled } from "@stitches/react";

const Button = styled("button", {
  // default: medium primary
  borderRadius: "12px",
  backgroundColor: "$white",
  color: "$black",
  fontSize: "$small",
  fontWeight: "$bold",
  padding: "6px 12px",
  border: "1px solid $black",

  "&:hover": {
    backgroundColor: "$border",
  },

  variants: {
    size: {
      md: {
        padding: "6px 12px",
      },
      lg: {
        fontSize: "$normal",
        fontWeight: "$bolder",
        padding: "10px 16px",
      },
      sm: {
        padding: "5px 8px",
      },
    },
    bg: {
      primary: {
        backgroundColor: "$white",
        border: "1px solid $black",
        color: "$black",
      },
      secondary: {
        backgroundColor: "transparent",
        border: "1px solid $border",
        color: "$links",
        "&:hover": {
          color: "$white",
          backgroundColor: "$links",
        },
      },
      transparent: {
        backgroundColor: "transparent",
        border: "0px",
        color: "$links",
      },
      solid: {
        backgroundColor: "$success",
        border: "0px",
        color: "$white",
        "&:hover": {
            backgroundColor: "#2A824E",
          },
      },
      danger: {
        backgroundColor: "$danger",
        border: "0px",
        color: "$white",
        "&:hover": {
            backgroundColor: "#AB2A2A",
          },
      },
    },
  },
});

export default Button;
