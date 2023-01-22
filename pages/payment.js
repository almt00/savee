import Layout from "../components/elements/Layout";
import Background from '../components/elements/Background';
import PaymentCard from '../components/payment/PaymentCard';
import Header from '../components/elements/Header';
import Breadcrumb from '../components/elements/Breadcrumb';
import Insight from '../components/elements/Insight';

const Payment = () => {
  return (
    <Layout title="Pagamento" description="Pagamento">
      <Background color='skyblue' />
      <Header page='Pagamento' />
      <div className='relative pt-20 px-6 flex flex-col gap-3 pb-6'>
        <Breadcrumb />
        <PaymentCard />
        <h3 className='mt-6'>Resumos do mês</h3>
        <Insight type="Aquecimento" value="11,3€" />
        <Insight type="Duche" value="20,4€" />
        <Insight type="Cozinhar" value="13,1€" />
      </div>
    </Layout>
  );
};
export default Payment;
