import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import Image from "next/image";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Form from "../components/elements/Form";
import Button from "../components/elements/Button";
import Background from "../components/elements/Background";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  //Grouping forms by section in a component
  const AuthFields = () => (
    <>
      <Form name="Email" />
      <div className="mt-6">
        <Form name="Password" />
      </div>
    </>
  );

  const UserFields = () => (
    <>
      <p className="black">
        Vamos customizar a tua experiência. Como te chamas?
      </p>
      <div className="mt-6">
        <Form name="Nome" />
      </div>
    </>
  );

  const GroupFields = () => (
    <>
      <p className="black">
        Não temos nenhum grupo associado ao teu email. Queres criar um novo
        grupo e convidar os teus colegas de casa?
      </p>
      <div className="mt-6">
        <Form name="Nome" />
      </div>
      <hr className="my-6" />
      <p className="black">
        O savee só funciona se todos colaborarem. Convida os teus colegas de
        casa e começa a poupar.
      </p>
      <div className="mt-6">
        <Form name="Emails colegas" />
      </div>
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
      <div className="mt-6">
        <Form name="Data da última fatura" />
      </div>
      <Link href="" className="text-links text-sm">
        Precisas de ajuda?
      </Link>
    </>
  );

  // logic to navigate between steps
  const Navigation = () => (
    <>
      <div className="flex justify-center">
        {step === fieldGroups.length - 1 && (
          <Link href="/homepage">
            <Button className="mt-6" bg="solid" size="lg">
              Criar conta
            </Button>
          </Link>
        )}
        {step < 2 && (
          <Button
            className="mt-6"
            bg="solid"
            size="lg"
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Próximo
          </Button>
        )}
        {step === fieldGroups.length - 2 && (
          <>
            <Link href="/homepage">
              <Button className="mt-6 mr-4" bg="transparent" size="lg">
                Mais tarde
              </Button>
            </Link>
            <Button
              className="mt-6"
              bg="solid"
              size="lg"
              onClick={() => {
                setStep(step + 1);
              }}
            >
              Próximo
            </Button>
          </>
        )}
      </div>
    </>
  );

  // state to keep track of the current step
  const [step, setStep] = useState(0);

  // array of components to be rendered
  const fieldGroups = [
    <AuthFields key={""} />,
    <UserFields key={""} />,
    <GroupFields key={""} />,
    <InvoiceFields key={""} />,
  ];

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
          {fieldGroups[step]}
          {/*todo: disable when form validation is set up*/}
          <Navigation />
        </Card>
      </div>
    </Layout>
  );
}
