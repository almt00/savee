import { styled } from "@stitches/react";

const Button = styled("button", {
  // default: medium primary
  borderRadius: "12px",
  backgroundColor: "$white",
  color: "$black",
  fontSize: "$small",
  fontWeight: "$bold",
  padding: "0.4rem 0.75rem",
  border: "1px solid $black",
  "&:focus-visible": {
    border: "2px solid $links",
  },
  "&:hover:enabled": {
    backgroundColor: "$border",
  },
  "&:disabled": {
    border: "1px solid $muted",
    color: "$muted",
  },

  variants: {
    size: {
      md: {
        padding: "0.4rem 0.75rem",
      },
      lg: {
        fontSize: "$normal",
        fontWeight: "$bolder",
        padding: "0.6rem 1rem",
      },
      sm: {
        padding: "0.3rem 0.5rem",
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
        "&:focus-visible": {
          border: "2px solid $links",
          backgroundColor: "transparent",
        },
        "&:hover:enabled": {
          color: "$white",
          backgroundColor: "$links",
        },
        "&:disabled": {
          color: "$links",
          opacity: 0.5,
          border: "1px solid $border",
        },
      },
      transparent: {
        backgroundColor: "transparent",
        border: "0px",
        color: "$links",
        "&:disabled": {
          border: "none",
          backgroundColor: "$white",
          color: "$muted",
        },
      },
      solid: {
        backgroundColor: "$success",
        border: "0px",
        color: "$white",
        "&:hover:enabled": {
          backgroundColor: "#2A824E",
        },
        "&:disabled": {
          backgroundColor: "$success",
          opacity: 0.5,
          color: "$white",
          border: "none",
        },
      },
      danger: {
        backgroundColor: "$danger",
        border: "0px",
        color: "$white",
        "&:hover:enabled": {
          backgroundColor: "#AB2A2A",
        },
        "&:disabled": {
          backgroundColor: "$danger",
          opacity: 0.5,
          color: "$white",
          border: "none",
        },
      },
    },
  },
});

export default Button;
