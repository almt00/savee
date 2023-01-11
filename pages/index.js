import Head from "next/head";
import { Inter } from "@next/font/google";
import Button from "../components/elements/Button";
import Form from "../components/elements/Form";
import { styled } from "../stitches.config";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Savee</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button bg="danger" size="lg" disabled>
          Button
        </Button>
        <Button size="sm" bg="danger">
          Button
        </Button>
        <Button size="md" bg="transparent" disabled>
          Button
        </Button>
        <Button size="lg" bg="transparent">
          Button
        </Button>
        <Button size="sm" bg="primary" disabled>
          Button
        </Button>
        <Button size="md" bg="solid" disabled>
          Button
        </Button>
        <Button size="lg" bg="secondary" disabled>
          Button
        </Button>
        <Form
          name="Data da última fatura"
          type="date"
          id="input_data_fatura"
        />
        <Form
          name="Nome"
          type="text"
          id="input_nome"
        />
      </main>
    </>
  );
}
