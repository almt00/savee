import * as Label from "@radix-ui/react-label";
import { styled } from "@stitches/react";
import { useEffect, useRef, forwardRef } from "react";

const Form = forwardRef((props, ref) => {
  console.log("render");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [props.name]);

  const messageList = [
    {
      name: "Primeiro nome",
      message: "Insere o teu primeiro nome",
      icon: "user.svg",
    },
    {
      name: "Apelido",
      message: "Insere o teu apelido",
      icon: "user.svg",
    },
    {
      name: "Potência",
      message: "Insere a potência",
      icon: "user.svg",
    },
    {
      name: "Email",
      message: "Insere o teu email",
      icon: "user.svg",
    },
    {
      name: "Password",
      message: "Insere a tua password",
      icon: "key.svg",
    },
    {
      name: "Nome grupo",
      message: "Insere um nome para o grupo",
      icon: "user.svg",
    },
    {
      name: "Emails colegas",
      message: "Adiciona os emails dos teus colegas",
      icon: "user.svg",
    },
    {
      name: "Data da última fatura",
      message: "Seleciona a data da última fatura",
      icon: "calendar-days.svg",
    },
    {
      name: "Valor fatura",
      message: "Insere o total da fatura deste mês",
      icon: "currency-euro.svg",
    },
    {
      name: "Nome de utilizador",
      message: "Adiciona um nome de utilizador",
      icon: "user.svg",
    },
  ];

  let placeholderValue = "";
  let icon = "";

  messageList.forEach((element) => {
    if (element.name === props.name) {
      placeholderValue = element.message;
      icon = element.icon;
    }
  });

  const clickedInput = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <LabelRoot>{props.name}</LabelRoot>
      <label></label>
      {props.type === "date" ? (
        <Input
          type={props.type}
          id={props.id}
          placeholder={placeholderValue}
          style={{
            background: `url(/img/${icon}) no-repeat 98%`,
            paddingTop: "9px",
          }}
          pattern={props.pattern}
          title={props.title}
          required={props.required}
          min={props.min}
          max={props.max}
          onChange={props.onChange}
          ref={ref || inputRef}
        />
      ) : (
        <Input
          type={props.type}
          id={props.id}
          placeholder={placeholderValue}
          style={{ background: `url(/img/${icon}) no-repeat 98%` }}
          pattern={props.pattern}
          title={props.title}
          required={props.required}
          min={props.min}
          max={props.max}
          name={props.name}
          onChange={props.onChange}
          ref={ref || inputRef}
        />
      )}
    </Container>
  );
});

Form.displayName = "Form"; // Add this line to set the display name

const LabelRoot = styled(Label.Root, {
  fontSize: "$normal",
  fontWeight: "$normal",
  color: "$black",
  marginBottom: "0.6rem",
});

const Input = styled("input", {
  all: "inherit",
  //make width fill to parent
  boxSizing: "border-box",
  width: "100%",
  borderRadius: 12,
  border: "1px solid $border",
  padding: "0 10px",
  marginTop: "0.6rem",
  height: 44,
  fontSize: "$normal",
  color: "$black",
  placeholderTextColor: "$muted",
  "&:focus": { border: "2px solid $links" },
  "&:disabled": { color: "$muted", opacity: 0.5, backgroundColor: "$border" },
  "&::-webkit-calendar-picker-indicator": {
    margin: "10px 0",
    background: "none",
  },
  "&::-webkit-datetime-edit": {
    fontSize: "$normal",
    color: "$muted",
    padding: "10px 0",
  },
});

const Container = styled("div", {
  display: "block",
  marginBottom: "4px",
  p: {
    fontSize: "small",
    color: "$danger",
    display: "inline",
    marginLeft: 4,
  },
  img: {
    display: "inline",
  },
});

export default Form;
