import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import Image from "next/image";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Form from "../components/elements/Form";
import Button from "../components/elements/Button";
import Background from "../components/elements/Background";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchAsyncUser } from "../store/UserSlice";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    console.log(event.target);
    // Get data from the form.
    const data = {
      email: event.target.Email?.value,
      password: event.target.Password?.value,
    };

    console.log(data);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "https://savee-api.vercel.app/user/login";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    if (result.success) {
      Cookies.set("userToken", result.token);
      Cookies.set("userId", result.user.user_id);
      const id = Cookies.get("userId");
      dispatch(fetchAsyncUser(id)); // fazer o fetch com redux
      router.push("/homepage");
    }
  };

  return (
    <Layout
      title="Página de login para entrar na plataforma, inserir email e password."
      description="Iniciar sessão"
    >
      <Background color="mint" />

      <div className="py-4 px-6">
        <Link href="/">
          <Image src="/img/logo.svg" alt="Logo" width={75} height={33} />
        </Link>
      </div>

      <div className="mx-6 mb-8">
        <H1 className="black">Iniciar sessão</H1>
        <p className="black">Inicia a tua sessão no Savee e começa a poupar.</p>
      </div>
      <div className="relative px-6 flex flex-col gap-3 pb-6">
        <Card>
          <form onSubmit={handleSubmit}>
            <Form name="Email" type="email" required />
            <div className="mt-6">
              <Form name="Password" type="password" required />
            </div>
            <div>
              <Link href="" className="text-links text-sm">
                Esqueci-me da password
              </Link>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="mt-6" bg="solid" size="lg">
                Iniciar sessão
              </Button>
            </div>
          </form>
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

const H1 = styled("h1", {
  fontSize: "$xlargeheading",
  fontWeight: "$bolder",
});
