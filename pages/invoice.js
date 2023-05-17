import Background from '../components/elements/Background';
import Header from '../components/elements/Header';
import Breadcrumb from '../components/elements/Breadcrumb';
import Form from '../components/elements/Form';
import Card from '../components/elements/Card';
import Link from 'next/link';
import Button from '../components/elements/Button';
import Layout from '../components/elements/Layout';

const Invoice = () => {
  return (
    <>
    <Layout description="Página para inserir valor faturado no mês atual que será dividido pelos consumos do grupo" title="Pagamento inserir valor fatura">
      <Background color='skyblue' />
      <Header page='Pagamento' />
      <div className='relative pt-20 px-6 flex flex-col gap-3 pb-6'>
        <Breadcrumb />
        <Card>
          <p className='black mb-6'>
            Está na hora de inserires os dados da fatura deste mês para dividir
            com os teus colegas de casa!
          </p>
          <p>
            Preenche os dados abaixo para o Savee dividir a fatura de acordo com
            os vossos consumos.
          </p>
          <div className='mt-6'>
            <Form name='Valor fatura' type='number'/>
          </div>
          <div className='text-center'>
            <Link href='/payment'>
              <Button className='mt-6' bg='solid' size='lg'>
                Inserir dados da fatura
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      </Layout>
    </>
  );
};
export default Invoice;
