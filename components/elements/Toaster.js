import { styled } from '@stitches/react';
import Button from './Button';
import { useState } from 'react';

export default function Toaster (){
  const [isShown, setIsShown] = useState(true);

  const hideToaster = event => {
    // 👇️ set it to true
    setIsShown(false);
  };

  if (isShown == true) {
    return (
      <Container>
        <BannerText>Valor confirmado com sucesso</BannerText>
        <Cross onClick={hideToaster}>X</Cross>
      </Container>
    );
  }
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

