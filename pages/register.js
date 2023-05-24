import Layout from "../components/elements/Layout";
import Image from "next/image";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Form from "../components/elements/Form";
import Button from "../components/elements/Button";
import Background from "../components/elements/Background";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAsyncUser } from "../store/UserSlice";

export default function Register() {
  // state to fix hydration issue
  const [hasMounted, setHasMounted] = useState(false);
  // state to keep track of the current step
  const [step, setStep] = useState(0);
  // var to keep track of the current date
  const maxDate = new Date().toISOString().split("T")[0];
  // state to keep track of the form user data
  const [userData, setUserData] = useState({});

  // dispatch to redux
  const dispatch = useDispatch();

  const updateStep = (formData) => {
    // save the form data in the state
    setUserData((prevData) => ({ ...prevData, ...formData }));
    setStep(step + 1);
  };

  //Grouping forms by section in a component
  const authFields = () => (
    <>
      <div>
        <Form
          name="Email"
          type="email"
          required="required"
          onUpdate={(value) => updateStep({ email: value })}
        />
      </div>
      <div className="mt-6">
        <Form
          name="Password"
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Deve conter pelo menos um número, uma maiúscula e uma minúscula, e conter pelo menos 8 caracteres."
          required="required"
          onUpdate={(value) => updateStep({ password: value })}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="mt-6"
          bg="solid"
          size="lg"
          onClick={() => updateStep(userData)}
        >
          Próximo
        </Button>
      </div>
    </>
  );

  const userFields = () => (
    <>
      <p className="black">
        Vamos customizar a tua experiência. Como te chamas?
      </p>
      <div className="mt-6">
        <Form
          name="Nome"
          type="text"
          required
          onUpdate={(value) => updateStep({ first_name: value })}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-6"
            bg="solid"
            size="lg"
            onClick={() => updateStep(userData)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </>
  );

  const groupFields = () => (
    <>
      <p className="black">
        Não temos nenhum grupo associado ao teu email. Queres criar um novo
        grupo e convidar os teus colegas de casa?
      </p>
      <div className="mt-6">
        <Form name="Nome grupo" type="text" />
      </div>
      <hr className="my-6" />
      <p className="black">
        O savee só funciona se todos colaborarem. Convida os teus colegas de
        casa e começa a poupar.
      </p>
      <div className="mt-6">
        <Form name="Emails colegas" type="email" />
      </div>
      <div className="flex justify-center">
        <Link href="/homepage">
          <Button
            type="submit"
            className="mt-6 mr-4"
            bg="transparent"
            size="lg"
          >
            Mais tarde
          </Button>
        </Link>
        <Button
          type="submit"
          className="mt-6"
          bg="solid"
          size="lg"
          onClick={() => updateStep(userData)}
        >
          Próximo
        </Button>
      </div>
    </>
  );

  const invoiceFields = () => (
    <>
      <div className="flex justify-center">
        <Image src="/img/fatura.svg" alt="Fatura" width={267} height={256} />
      </div>
      <p className="mt-6 black">
        Consulta a tua fatura de eletricidade e acrescenta os seguintes dados
        para o Savee conseguir calcular quanto poupaste.
      </p>
      <div className="mt-6">
        <Form
          name="Data da última fatura"
          type="date"
          min="2022-01-01"
          max={maxDate}
          required
        />
      </div>
      <Link href="" className="text-links text-sm">
        Precisas de ajuda?
      </Link>
      <div className="flex justify-center">
        <Link href={"/homepage"}>
          <Button
            type="submit"
            className="mt-6"
            bg="solid"
            size="lg"
            onClick={() => dispatch(registerAsyncUser(userData))}
          >
            Criar conta
          </Button>
        </Link>
      </div>
    </>
  );
  const loadContent = () => {
    console.log(step);
    if (step === 0) {
      return authFields(updateStep);
    } else if (step === 1) {
      return userFields(updateStep);
    } else if (step === 2) {
      return groupFields(updateStep);
    } else if (step === 3) {
      return invoiceFields(updateStep);
    } else {
      return <></>;
    }
  };

  return (
    <>
      {step <= 3 && (
        <Layout
          title="Página para criar uma conta e um grupo de partilha em Savee, segue os passos com a informação adequada e poderas usufruir das vantagens de utilizar Savee."
          description="Criar conta"
        >
          <Background color="mint" />

          <div className="py-4 px-6">
            <Link href="/">
              <Image src="/img/logo.svg" alt="Logo" width={75} height={33} />
            </Link>
          </div>

          <div className="mx-6 mb-8">
            <H1 className="black">Criar conta</H1>
            <p className="black">
              Cria a tua conta no Savee e começa a poupar.
            </p>
          </div>
          <div className="relative px-6 flex flex-col gap-3 pb-6">
            <Card>
              <form>{loadContent()}</form>
            </Card>
          </div>
        </Layout>
      )}
    </>
  );
}

const H1 = styled("h1", {
  fontSize: "$xlargeheading",
  fontWeight: "$bolder",
});
