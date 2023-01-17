import { styled } from '@stitches/react';
import Chart from './Chart';

//criar switch ou else if :
//com tendência a subir em comparação com último mÊs _ seta up,
//tendencia a descer  _seta down,
//igual ao do mês passado ou empty state sem seta

const DashboardCard = () => {
  let kwTotalGroup = 22;
  let kwTotalUser = 53;
  let numberDays = 22;
  let percentage = 1.5;

  return (
    <div>
      <Container>
        <NumberKw>
          {kwTotalUser} kW
          <TrendIcon
            src='/img/tendencia_up.svg'
            className='ml-6'
            alt='Pagamentos'
          />
          <SubTitle>
        de <span className='font-bold'>{kwTotalGroup} kW </span>consumidos este
        mês
      </SubTitle>
        </NumberKw>
        
        <Chart></Chart>
      </Container>
      <Stats className='mb-2'>
        <span className='font-bold'>{numberDays} dias </span>até ao próximo
        pagamento
      </Stats>
      <Stats>
        <span className='font-bold'>{percentage}% </span>melhor que o mês
        passado
      </Stats>
    </div>
  );
};

const Container = styled('div', {
  display: 'flex',
});

const Stats = styled('p', {
  color: '$black',
});

const SubTitle = styled('p', {
  color: '$black',
  fontSize: '$small',
});

const NumberKw = styled('p', {
  color: '$black',
  fontSize: '$f0',
  fontWeight: '$bolder',
  lineHeight: '3rem',
  flex: '1',
});

const TrendIcon = styled('img', {
  display: 'inline',
});

export default DashboardCard;
