import { styled } from '@stitches/react';
import Button from './Button';

const Banner = () => {
  return (
    <Container>
      {/* <Container class='flex justify-between'></Container> */}
      <Text>Está na hora de pagar!</Text>
      <Button size='md' bg='primary'>Inserir fatura</Button> 
    </Container>
  );
};

const Text = styled('span', {
  color: '$white',
  fontSize: '$normal',
  fontWeight: '$normal',
});

const Container = styled('div', {
  backgroundColor: '$black',
  borderRadius: '12px',
  padding: '1rem 1.5rem'
});

export default Banner;