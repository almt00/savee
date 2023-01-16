import { styled } from "@stitches/react";

const Card = (props) => {
  return (
    <Container type={props.type} className={props.classes}>
      {props.children}
    </Container>
  );
};

const Container = styled("div", {
  backgroundColor: "$white",
  borderRadius: "12px",
  margin: "1.125rem 1.5rem",
  padding: "1.5rem 1rem",
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
