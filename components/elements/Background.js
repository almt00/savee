import { styled } from "@stitches/react";

const Background = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled("div", {
  backgroundColor: "$mint",
  zIndex: "-1",
  borderRadius: "0 0 12px 12px",
});

export default Background;
