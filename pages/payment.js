import Layout from "../components/elements/Layout";
import Background from "../components/elements/Background";
import PaymentCard from "../components/payment/PaymentCard";
import Header from "../components/elements/Header";
import Breadcrumb from "../components/elements/Breadcrumb";
import Insight from "../components/elements/Insight";
import { useDispatch } from "react-redux";
import { setPage } from "../store/PageSlice";

const Payment = () => {
  const dispatch = useDispatch();
  dispatch(setPage("payment"));

  return (
    <Layout title="Pagamento" description="Pagamento">
      <Background color="skyblue" />
      <Header page="Pagamento" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Breadcrumb />
        <PaymentCard />
        <h3 className="mt-6">Resumos do mês</h3>
        <Insight taskId={0} type="Aquecimento" value="11,3€" />
        <Insight taskId={2} type="Duche" value="20,4€" />
        <Insight taskId={3} type="Cozinhar" value="13,1€" />
      </div>
    </Layout>
  );
};
export default Payment;
