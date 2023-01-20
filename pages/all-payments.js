import Head from "next/head";
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

  //help não consigo store os valores da api nestas vars
  let value = "";
  let totalValue = "";
  let date = "";

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  if (data) {
   
  }
  const PayHisto = data.hist_payment.map((payment, index)=>{
        value = payment.percentage;
        totalValue = payment.total_value;
        date = payment.date;
        console.log(payment.id);
        console.log(value);
        console.log(totalValue);
        console.log(date); 
        return(
            <PaymentInfo key={index}>
              <h4>{value}</h4>
              <p className="mt-1">de {totalValue}€ totais</p>
              <p>{date}</p>
            </PaymentInfo>
    )
    });

  return (
    <>
      <Head>
        <title>Savee</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background color="skyblue" />
      <Header page="Pagamentos" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Card>
          <ThisMonth>55€</ThisMonth>
          <p className="mt-2">Pagos a 24 de dezembro</p>
        </Card>

        <h3>Histórico de pagamento</h3>

        <Card type="stroke">
          <CardItem>
            <PaymentInfo>
              <h4>22€</h4>
              <p className="mt-1">de 55€ totais</p>
            </PaymentInfo>
            {PayHisto}
            <p className="text-muted">21/11</p>
          </CardItem>
        </Card>
      </div>
    </>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
})

export default AllPayments;
