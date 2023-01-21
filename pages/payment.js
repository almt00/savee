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
        <Insight />
        <Insight />
        <Insight />
      </div>
    </Layout>
  );
};
export default Payment;
