import Background from "../components/elements/Background";
import Header from "../components/elements/Header";
import Breadcrumb from "../components/elements/Breadcrumb";
import Form from "../components/elements/Form";
import Card from "../components/elements/Card";
import Link from "next/link";
import Button from "../components/elements/Button";
import Layout from "../components/elements/Layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Invoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Get data from the form.
    const data = {
      value_payment: parseInt(document.getElementById("valorfatura").value),
    };

    const JSONdata = JSON.stringify(data);
    console.log(JSONdata);

    const id = Cookies.get("houseId"); // Get the id from the cookie

    const endpoint = `https://savee-api.vercel.app/house/${id}/payment`; // Concatenate the id into the endpoint

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    if (result.success) {
      dispatch(fetchAsyncUser());
      router.push("/payment");
    }
  };

  return (
    <>
      <Layout
        description="Página para inserir valor faturado no mês atual que será dividido pelos consumos do grupo"
        title="Pagamento inserir valor fatura"
      >
        <Background color="skyblue" />
        <Header page="Pagamento" />
        <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
          <Breadcrumb />
          <Card>
            <p className="black mb-6">
              Está na hora de inserires os dados da fatura deste mês para
              dividir com os teus colegas de casa!
            </p>
            <p>
              Preenche os dados abaixo para o Savee dividir a fatura de acordo
              com os vossos consumos.
            </p>
            <div className="mt-6">
              <Form id="valorfatura" name="Valor fatura" type="number" />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="mt-6"
                bg="solid"
                size="lg"
              >
                Inserir dados da fatura
              </Button>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
};
export default Invoice;
