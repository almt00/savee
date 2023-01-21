import { styled } from '@stitches/react';
import Button from './Button';
import Link from "next/link";

const Banner = () => {
  return (
    <Container>
      <BannerText>Está na hora de pagar!</BannerText>
      <Link href='/payment'>
        <Button size='md' bg='primary'>
          Inserir fatura
        </Button>
      </Link>
    </Container>
  );
};

const BannerText = styled('p', {
  color: '$white',
  fontSize: '$normal',
  fontWeight: '$normal',
  alignSelf: 'center',
});

const Container = styled('div', {
  backgroundColor: '$black',
  borderRadius: '12px',
  padding: '1rem 1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

export default Banner;
