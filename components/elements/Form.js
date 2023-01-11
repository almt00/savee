import * as Label from "@radix-ui/react-label";
import { styled } from "@stitches/react";

// to do form validation
// to do error message

const Form = (props) => (
  // Pass props to label and default value
  // Pass props to type
  <Container>
    <LabelRoot as="form">Insert value</LabelRoot>
    <Input type={props.type} id={props.name} placeholder={props.name} />
  </Container>
);

const LabelRoot = styled(Label.Root, {
  fontSize: "$normal",
  fontWeight: "$normal",
  color: "$black",
  marginBottom: "0.6rem",
});

const Input = styled("input", {
  all: "unset",
  //make width fill to parent
  width: 300,
  borderRadius: 12,
  border: "1px solid $border",
  padding: "0 10px",
  height: 44,
  fontSize: "$normal",
  color: "$black",
  placeholderTextColor: "$muted",
  "&:focus": { border: "2px solid $links" },
  "&:disabled": { color: "$muted", opacity: 0.5, backgroundColor: "$border" },
});

const Container = styled("div", {
  display: "block",
});

export default Form;
