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
import { fetchAsyncUser } from "../store/UserSlice";

const Invoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valuePayment = parseInt(document.getElementById("valorfatura").value);

    // Check if there's already an entry in the last 28 days
    const currentDate = new Date();
    const last28Days = new Date();
    last28Days.setDate(currentDate.getDate() - 28);
    const id = Cookies.get("houseId");
    const endpoint = `https://savee-api.vercel.app/house/${id}/payment`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    console.log(result);

    if (result.length > 0) {
      // check if there's an entry in the last 28 days
      const existingEntry = result.some((entry) => {
        const entryDate = new Date(entry.date_payment);
        return entryDate >= last28Days && entryDate <= currentDate;
      });
      if (existingEntry) {
        // An entry already exists in the last 28 days, show an error
        alert("An entry in the last 28 days already exists.");
        return;
      }
    }

    const data = {
      value_payment: valuePayment,
    };
    const JSONdata = JSON.stringify(data);

    const createEndpoint = `https://savee-api.vercel.app/house/${id}/payment`;
    const createOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
      body: JSONdata,
    };

    const createResponse = await fetch(createEndpoint, createOptions);
    const createResult = await createResponse.json();

    if (createResult.success) {
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
