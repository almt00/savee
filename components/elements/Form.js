import * as Label from "@radix-ui/react-label";
import { styled } from "@stitches/react";
import { useEffect } from "react";
import Image from "next/image";
// to do form validation
// to do error message

const Form = (props) => {
  // Pass props to label and default value
  // Pass props to type

  const messageList = [
    {
      name: "Nome",
      message: "Insere o teu nome",
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
  ];

  let placeholderValue = "";
  let icon = "";

  messageList.forEach((element) => {
    if (element.name === props.name) {
      placeholderValue = element.message;
      icon = element.icon;
    }
  });

  //dummy verify so pra testar umas coisas, n esta a ser usado atm
  /*
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
  */

  return (
    <Container>
      <LabelRoot as="form">{props.name}</LabelRoot>
      <Input
        type={props.type}
        id={props.id}
        placeholder={placeholderValue}
        style={{ background: `url(/img/${icon}) no-repeat 98%` }}
        required={props.required}
      />
      <div id={`${props.id}_error`} className="hidden">
        <Image src="/img/x-circle.svg" alt="Erro" width="20" height="20" />
        <p>Isto é um erro</p>
      </div>
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
  boxSizing: "border-box",
  width: "100%",
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
