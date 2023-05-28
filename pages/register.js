import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import Image from "next/image";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Form from "../components/elements/Form";
import Button from "../components/elements/Button";
import Background from "../components/elements/Background";
import Link from "next/link";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  // state to keep track of the current step
  const [step, setStep] = useState(0);
  // var to keep track of the current date
  const maxDate = new Date().toISOString().split("T")[0];
  const [userData, setUserData] = useState({});

  const updateStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Get data from the form.
    const data = {
      first_name: userData.primeiro_nome,
      last_name: userData.segundo_nome,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      house_id: 1, // mudar
      ref_avatar: null, // mudar
    };

    const JSONdata = JSON.stringify(data);
    console.log(JSONdata);

    const endpoint = "https://savee-api.vercel.app/user/";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    /*  const result = await response.json();
    if (result.success) {
      Cookies.set("userToken", result.token);
      Cookies.set("userId", result.user.user_id);
      const id = Cookies.get("userId");
      dispatch(fetchAsyncUser(id)); // fazer o fetch com redux
      router.push("/homepage");
    } */
  };

  const updateValue = (e) => {
    const name = e?.target.id;
    const value = e?.target.value;
    setUserData({ ...userData, [name]: value });
  };

  //Grouping forms by section in a component
  const authFields = () => (
    <>
      <div>
        <Form
          id="email"
          name="Email"
          type="email"
          required="required"
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <div className="mt-6">
        <Form
          id="password"
          name="Password"
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Deve conter pelo menos um número, uma maiúscula e uma minúscula, e conter pelo menos 8 caracteres."
          required="required"
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="mt-6"
          bg="solid"
          size="lg"
          onClick={updateStep}
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
      <div div className="mt-6">
        <Form
          id="primeiro_nome"
          name="Primeiro nome"
          type="text"
          required
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <div div className="mt-6">
        <Form
          id="segundo_nome"
          name="Apelido"
          type="text"
          value=""
          required
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <div className="mt-6">
        <Form
          id="username"
          name="Nome de utilizador"
          type="text"
          required="required"
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="mt-6"
          bg="solid"
          size="lg"
          onClick={updateStep}
        >
          Próximo
        </Button>
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
        <Form
          id="nome_grupo"
          name="Nome grupo"
          type="text"
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <hr className="my-6" />
      <p className="black">
        O savee só funciona se todos colaborarem. Convida os teus colegas de
        casa e começa a poupar.
      </p>
      <div className="mt-6">
        <Form
          id="email_colega"
          name="Emails colegas"
          type="email"
          onChange={(e) => {
            updateValue(e);
          }}
        />
      </div>
      <div className="flex justify-center">
        <Link href="/homepage">
          <Button
            type="submit"
            className="mt-6 mr-4"
            bg="transparent"
            size="lg"
            onClick={handleSubmit}
          >
            Mais tarde
          </Button>
        </Link>
        <Button
          type="submit"
          className="mt-6"
          bg="solid"
          size="lg"
          onClick={updateStep}
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
          id="data_fatura"
          name="Data da última fatura"
          type="date"
          min="2022-01-01"
          max={maxDate}
          onChange={(e) => {
            updateValue(e);
          }}
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
            onClick={handleSubmit}
          >
            Criar conta
          </Button>
        </Link>
      </div>
      {/* </form> */}
    </>
  );
  const loadContent = () => {
    console.log(step);
    if (step === 0) {
      return authFields();
    } else if (step === 1) {
      return userFields();
    } else if (step === 2) {
      return groupFields();
    } else if (step === 3) {
      return invoiceFields();
    } else {
      return <></>;
    }
  };

  return (
    <>
      {step <= 3 && (
        <Layout
          description="Página para criar uma conta e um grupo de partilha em Savee, segue os passos com a informação adequada e poderas usufruir das vantagens de utilizar Savee."
          title="Criar conta"
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
