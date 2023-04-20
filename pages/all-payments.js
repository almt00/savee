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
import {
  fetchAsyncPaymentGroupDetailsSlice,
  getPaymentGroupDetails,
} from "../store/PaymentGroupDetailsSlice";

const AllPayments = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(getPayment);
  const paymentGroupData = useSelector(getPaymentGroup);
  const paymentGroupDetailsData = useSelector(getPaymentGroupDetails);
  dispatch(setPage("payments"));

  const userId = 1;
  const houseId = 1;
  const paymentId = 1;
  let date = "";
  let cleanDate = "";
  let userValue = "";
  let obj = "";
  let objGroup = "";
  let PayHisto = "";
  let objDetails = "";

  useEffect(() => {
    if (
      paymentData.status !== 200 &&
      paymentGroupData.status !== 200 &&
      paymentGroupDetailsData.status !== 200
    ) {
      dispatch(fetchAsyncPaymentSlice(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
      dispatch(fetchAsyncPaymentGroupSlice(houseId));
      dispatch(fetchAsyncPaymentGroupDetailsSlice(houseId, paymentId));
    }
  }, [dispatch]);

  if (
    paymentData.status === 200 &&
    paymentGroupData.status === 200 &&
    paymentGroupDetailsData.status === 200
  ) {
    obj = paymentGroupData.paymentGroup;

    console.log(paymentGroupData.paymentGroup);

    objDetails = paymentGroupDetailsData.paymentGroupDetails;

    console.log(paymentGroupDetailsData.paymentGroupDetails);

    PayHistory = objDetails.map((item, index) => {
      date = item.date;
      cleanDate = date.slice(0, 10);
      userValue = item.value;

      return (
        <Link href="/payment" key={index}>
          <Card type="stroke">
            <CardItem className="flex justify-between items-center">
              <PaymentInfo>
                <h4>{userValue}€</h4>
                <p className="mt-1">de {totalValue}€ totais</p>
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
