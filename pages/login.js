import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Form from "../components/elements/Form";
import Button from "../components/elements/Button";
import Background from "../components/elements/Background";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <>
      <Head>
        <title>Savee</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background color="mint"/>

      <div className="py-4 px-6">
        <Image src="/img/logo.svg" alt="Logo" width={75} height={33} />
      </div>

      <div className="mx-6 mb-8">
        <h1 className="black">Iniciar sessão</h1>
        <p className="black">Inicia a tua sessão no Savee e começa a poupar.</p>
      </div>

      <Card>
        <Form name="Email" />
        <div className="mt-6">
          <Form name="Password" />
        </div>
        <div className="flex justify-center">
          <Button className="mt-6" bg="solid" size="lg">
            Iniciar sessão
          </Button>
        </div>
      </Card>

      <div className="mx-6 mt-60 text-center">
        <p>
          Ainda não tens conta?{" "}
          <Link href="/register" className="font-bold text-links">
            Criar conta
          </Link>
        </p>
      </div>
    </>
  );
}
