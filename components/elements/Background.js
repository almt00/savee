import { styled } from "@stitches/react";

const Background = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled("div", {
  linearGradient: '19deg, #21D4FD 0%, #B721FF 100%',
  zIndex: "-1",
  borderRadius: "0 0 12px 12px",
});

export default Background;
