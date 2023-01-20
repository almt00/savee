import { styled } from '@stitches/react';
import Button from './Button';
import { Cross1Icon } from '@radix-ui/react-icons';

const Toaster = () => {

  return (
    <Container>
      <BannerText>Valor confirmado com sucesso</BannerText>
      <Cross>X</Cross>
    </Container>
  );
};

const BannerText = styled('p', {
  color: '$white',
  fontSize: '$normal',
  fontWeight: '$normal',
  alignSelf: 'center'
});

const Container = styled('div', {
  backgroundColor: '$black',
  borderRadius: '12px',
  padding: '1rem 1.5rem', 
  display: 'flex',
  justifyContent: 'space-between'
});
const Cross = styled(Button,{
    backgroundColor: "$black",
    color: "$white",
    "&:active": {
        border: "1px solid $muted",
        backgroundColor: '$black',
      },
}) 

export default Toaster;