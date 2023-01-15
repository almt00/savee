import { styled } from '@stitches/react';

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
      <NumberKw>
        {kwTotalUser} kW
        <TrendIcon
          src='/img/tendencia_up.svg'
          className='ml-6'
          alt='Pagamentos'
        />
      </NumberKw>
      <SubTitle>
        de <span className='font-bold'>{kwTotalGroup} kW </span>consumidos este
        mês
      </SubTitle>
      <Stats className='mt-5 mb-2'>
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
  display: 'inline',
  lineHeight: '3rem',
});

const TrendIcon = styled('img', {
  display: 'inline',
});

export default DashboardCard;
