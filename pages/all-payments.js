import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const inter = Inter({ subsets: ["latin"] });

const AllPayments = () => {
  //Set up SWR to run the fetcher function when calling api
  const { data, error } = useSWR("/api/user_1", fetcher);

  let value = "";
  let totalValue = "";
  let date = "";
  let cleanDate = "";
  let percetoeuro = "";

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  //Map to manipulate objet coming from fetch
  const PayHisto = data.hist_payment.map((payment, index) => {
    value = payment.percentage;
    totalValue = payment.total_value;
    date = payment.date;
    const options = { month: "short", day: "numeric" };
    cleanDate = new Date(date).toLocaleDateString("pt-PT", options);
    percetoeuro = ((totalValue / 100) * value).toFixed(2);

    return (
      <>
        <Card type="stroke">
          <CardItem className="flex justify-between items-center">
            <PaymentInfo key={index}>
              <h4>{percetoeuro}€</h4>
              <p className="mt-1">de {totalValue}€ totais</p>
            </PaymentInfo>
            <p className="text-muted">{cleanDate}</p>
          </CardItem>
        </Card>
      </>
    );
  });

  return (
    <Layout title="Histórico pagamentos" description="Histórico pagamentos">
      <Background color="skyblue" size="small" />
      <Header page="Pagamentos" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Card>
          <ThisMonth>55€</ThisMonth>
          <p className="mt-2">Pagos a 24 de dezembro</p>
        </Card>
        <h3 className="mt-6">Histórico de pagamento</h3>
        {PayHisto}
      </div>
    </Layout>
  );
};

const ThisMonth = styled("div", {
  color: "$black",
  fontSize: "$f0",
  fontWeight: "$bolder",
  lineHeight: "3rem",
  flex: "1",
});

const PaymentInfo = styled("div", {
  p: {
    fontSize: "$small",
  },
});

const CardItem = styled("div", {
  p: {
    fontSize: "$small",
  },
});

export default AllPayments;