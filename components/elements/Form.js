import * as Label from "@radix-ui/react-label";
import { styled } from "@stitches/react";
import Button from "./Button";
import { useEffect } from "react";
// to do form validation
// to do error message

const Form = (props) => {
  // Pass props to label and default value
  // Pass props to type

  const messageList = [
    {
      name: "Nome",
      message: "Insere o teu nome",
    },
    {
      name: "Potência",
      message: "Insere a potência",
    },
    {
      name: "Email",
      message: "Insere o teu email",
    },
    {
      name: "Password",
      message: "Insere a tua password",
    },
    {
      name: "Email colega",
      message: "Adiciona os emails dos teus colegas",
    },
    {
      name: "Data da última fatura",
      message: "Seleciona a data da última fatura",
    },
    {
      name: "Valor fatura",
      message: "Insere o total da fatura deste mês",
    },
  ];

  let placeholderValue = "";

  messageList.forEach((element) => {
    if (element.name === props.name) {
      return (placeholderValue = element.message);
    }
  });

  //dummy verify so pra testar umas coisas
  useEffect(() => {
    const verify = () => {
      if (document.getElementById(props.name)) {
        let inputValue = document.getElementById(props.name).value;
        if (inputValue === "Pedro") {
          console.log("cool");
        } else {
          console.log("sad");
        }
        console.log(inputValue);
      }
    };
  }, []);

  return (
    <Container>
      <LabelRoot as="form">{props.name}</LabelRoot>
      <Input
        required
        type={props.type}
        id={props.id}
        placeholder={placeholderValue}
      />
    </Container>
  );
};

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
  "&::-webkit-calendar-picker-indicator": {
    margin: "10px 0",
  },
  "&::-webkit-datetime-edit": {
    fontSize: "$normal",
    color: "$muted",
    padding: "10px 0",
  },
});

const Container = styled("div", {
  display: "block",
});

export default Form;
