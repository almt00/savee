import Layout from "../components/elements/Layout";
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
    <Layout title="Iniciar sessão" description="Iniciar sessão">
      <Background color="mint" />

      <div className="py-4 px-6">
        <Link href="/">
          <Image src="/img/logo.svg" alt="Logo" width={75} height={33} />
        </Link>
      </div>

      <div className="mx-6 mb-8">
        <h1 className="black">Iniciar sessão</h1>
        <p className="black">Inicia a tua sessão no Savee e começa a poupar.</p>
      </div>
      <div className="relative px-6 flex flex-col gap-3 pb-6">
        <Card>
          <Form name="Email" />
          <div className="mt-6">
            <Form name="Password" />
          </div>
          <div>
            <Link href="" className="text-links text-sm">
              Esqueci-me da password
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/homepage">
              <Button className="mt-6" bg="solid" size="lg">
                Iniciar sessão
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="mx-6 mt-14 text-center">
        <p>
          Ainda não tens conta?
          <Link href="/register" className="font-bold text-links">
            {" "}
            Criar conta
          </Link>
        </p>
      </div>
    </Layout>
  );
}
