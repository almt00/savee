import Layout from "../components/elements/Layout";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";
import { fetchAsyncPaymentSlice, getPayment } from "../store/PaymentSlice";

const AllPayments = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(getPayment);

  const userId = 1;
  const obj = paymentData.payment;

  useEffect(() => {
    dispatch(setPage("payments"));
    if (paymentData.status !== 200) {
      dispatch(fetchAsyncPaymentSlice(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  const lastPayment = () => {
    if (paymentData.status === 200) {
      let lastPaymentData = obj[0]?.payment;
      const options = { month: "long", day: "numeric" };
      let lastDate = new Date(lastPaymentData.date_payment).toLocaleDateString(
        "pt-PT",
        options
      );
      return (
        <Card>
          <ThisMonth>{lastPaymentData.value_payment}€</ThisMonth>
          <p className="mt-2">Pagos a {lastDate}</p>
        </Card>
      );
    }
  };
  let PayHisto = () => {
    if (paymentData.status === 200) {
      return obj?.map((payment, index) => {
        let totalValue = payment.payment.value_payment;
        let value = payment.payment_percentage * totalValue;
        let date = payment.payment.date_payment;
        const options = { month: "short", day: "numeric" };
        let cleanDate = new Date(date).toLocaleDateString("pt-PT", options);

        return (
          <li key={index}>
            <Link href={`/payment?id=${payment.payment_id}`}>
              <Card type="stroke">
                <CardItem
                  className="flex justify-between items-center"
                  key={index}
                >
                  <PaymentInfo>
                    <h4>{value}€</h4>
                    <p className="mt-1">de {totalValue}€ totais</p>
                  </PaymentInfo>
                  <p className="text-muted">{cleanDate}</p>
                </CardItem>
              </Card>
            </Link>
          </li>
        );
      });
    }
  };

  return (
    <Layout title="Histórico pagamentos" description="Histórico pagamentos">
      <Background color="skyblue" size="small" />
      <Header page="Pagamentos" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        {lastPayment()}
        <h3 className="mt-6">Histórico de pagamento</h3>
        <ul>{PayHisto()}</ul>
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
