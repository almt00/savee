import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser, getUser } from "../store/UserSlice";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";

const AllPayments = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  dispatch(setPage("payments"));

  const userId = 1;
  let value = "";
  let totalValue = "";
  let date = "";
  let cleanDate = "";
  let percetoeuro = "";
  let obj = "";
  let PayHisto = "";

  useEffect(() => {
    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  if (userData.status === 200) {
    obj = userData.hist_payment;
    PayHisto = obj?.map((payment, index) => {
      value = payment.percentage;
      totalValue = payment.total_value;
      date = payment.date;
      const options = { month: "short", day: "numeric" };
      cleanDate = new Date(date).toLocaleDateString("pt-PT", options);
      percetoeuro = ((totalValue / 100) * value).toFixed(2);

      return (
        <>
          <Link href="/payment">
            <Card type="stroke" key={index}>
              <CardItem className="flex justify-between items-center" key={index}>
                <PaymentInfo key={index}>
                  <h4>{percetoeuro}€</h4>
                  <p className="mt-1">de {totalValue}€ totais</p>
                </PaymentInfo>
                <p className="text-muted">{cleanDate}</p>
              </CardItem>
            </Card>
          </Link>
        </>
      );
    });
  }

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
  fontSize: "$",
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
