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
  // state to fix hydration issue
  const [hasMounted, setHasMounted] = useState(false);
  // state to keep track of the current step
  const [step, setStep] = useState(0);
  // var to keep track of the current date
  const maxDate = new Date().toISOString().split("T")[0];

  // useEffect to fix hydration issue
  /* useEffect(() => {
    setHasMounted(true);
  }, []); */

  /*  if (!hasMounted) {
    return null;
  } */

  //Grouping forms by section in a component
  function authFields() {
    return (
      <>
        <input placeholder="Email" type="email" required></input>
        <div className="mt-6">
          <Form
            name="Password"
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Deve conter pelo menos um número, uma maiúscula e uma minúscula, e conter pelo menos 8 caracteres."
            required
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="mt-6" bg="solid" size="lg">
            Próximo
          </Button>
        </div>
      </>
    );
  }

  const UserFields = () => (
    <>
      <form
        onSubmit={() => {
          setStep(step + 1);
        }}
      >
        <p className="black">
          Vamos customizar a tua experiência. Como te chamas?
        </p>
        <div className="mt-6">
          <Form name="Nome" type="text" required />
          <div className="flex justify-center">
            <Button type="submit" className="mt-6" bg="solid" size="lg">
              Próximo
            </Button>
          </div>
        </div>
      </form>
    </>
  );

  const GroupFields = () => (
    <>
      <p className="black">
        Não temos nenhum grupo associado ao teu email. Queres criar um novo
        grupo e convidar os teus colegas de casa?
      </p>
      <form
        onSubmit={() => {
          setStep(step + 1);
        }}
      >
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
          <Button type="submit" className="mt-6" bg="solid" size="lg">
            Próximo
          </Button>
        </div>
      </form>
    </>
  );

  const InvoiceFields = () => (
    <>
      <div className="flex justify-center">
        <Image src="/img/fatura.svg" alt="Fatura" width={267} height={256} />
      </div>
      <p className="mt-6 black">
        Consulta a tua fatura de eletricidade e acrescenta os seguintes dados
        para o Savee conseguir calcular quanto poupaste.
      </p>
      <form action="/homepage">
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
          <Button type="submit" className="mt-6" bg="solid" size="lg">
            Criar conta
          </Button>
        </div>
      </form>
    </>
  );

  // array of components to be rendered
 /*  const fieldGroups = [
    <AuthFields key={""} />,
    <UserFields key={""} />,
    <GroupFields key={""} />,
    <InvoiceFields key={""} />,
  ]; */

  return (
    <Layout title="Criar conta" description="Criar conta">
      <Background color="mint" />

      <div className="py-4 px-6">
        <Link href="/">
          <Image src="/img/logo.svg" alt="Logo" width={75} height={33} />
        </Link>
      </div>

      <div className="mx-6 mb-8">
        <h1 className="black">Criar conta</h1>
        <p className="black">Cria a tua conta no Savee e começa a poupar.</p>
      </div>
      <div className="relative px-6 flex flex-col gap-3 pb-6">
        <Card>
          {authFields()}
        </Card>
      </div>
    </Layout>
  );
}
