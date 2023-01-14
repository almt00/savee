import { styled } from "@stitches/react";

const Card = (props) => {
  return <Container type={props.type}>{props.children}</Container>;
};

const Container = styled("div", {
  backgroundColor: "$white",
  borderRadius: "12px",
  margin: "18px 24px",
  padding: "24px 16px",
  width: "auto",
  boxShadow: "$card",
  variants: {
    type: {
      default: {
        boxShadow: "$card",
      },
      stroke: {
        boxShadow: "none",
        border: "1.5px solid $border",
      },
    },
  },
});

export default Card;
