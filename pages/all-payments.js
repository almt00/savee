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
import {
  fetchAsyncPaymentGroupSlice,
  getPaymentGroup,
} from "../store/PaymentGroupSlice";

const AllPayments = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(getPayment);
  const paymentGroupData = useSelector(getPaymentGroup);
  dispatch(setPage("payments"));

  const userId = 1;
  const houseId = 1;
  let totalValue = [];
  let date = "";
  let cleanDate = "";
  let userValue = "";
  let obj = "";
  let objGroup = "";
  let PayHisto = "";

  useEffect(() => {
    if (paymentData.status !== 200 && paymentGroupData.status !== 200) {
      dispatch(fetchAsyncPaymentSlice(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
      dispatch(fetchAsyncPaymentGroupSlice(houseId));
    }
  }, [dispatch]);

  if (paymentData.status === 200 && paymentGroupData.status === 200) {
    obj = paymentData.payment;
    objGroup = paymentGroupData.paymentGroup;

    PayHisto = obj?.map((payment, index) => {
      date = payment.date_payment;
      const options = { month: "short", day: "numeric" };
      cleanDate = new Date(date).toLocaleDateString("pt-PT", options);
      userValue = payment.value_payment;

      // accumulate the total value of all the group.value_payment corresponding to the same payment
      const totalValue = objGroup.reduce((acc, group) => {
        if (group.payment_id === payment.id) {
          return acc + group.value_payment;
        }
        return acc;
      }, 0);

      return (
        <Link href="/payment" key={index}>
          <Card type="stroke">
            <CardItem className="flex justify-between items-center">
              <PaymentInfo>
                <h4>{userValue}€</h4>
                {totalValue > 0 && (
                  <p className="mt-1">de {totalValue}€ totais</p>
                )}
              </PaymentInfo>
              <p className="text-muted">{cleanDate}</p>
            </CardItem>
          </Card>
        </Link>
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
