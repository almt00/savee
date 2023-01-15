import { styled } from "@stitches/react";

const Background = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled("div", {
  background:
    "linear-gradient(180deg, $mint 0%, $mint 35%, $mintTransparent 35%, $white 100%);",
  zIndex: "-1",
  borderRadius: "0 0 12px 12px",
});

export default Background;
