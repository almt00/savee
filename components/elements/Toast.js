import { styled } from '@stitches/react';
import Button from './Button';
import { useState } from 'react';

export default function Toast (){
  const [isShown, setIsShown] = useState(true);

  const hideToaster = event => {
    // 👇️ set it to true
    setIsShown(false);
  };

  if (isShown == true) {
    return (
      <Container>
        <BannerText>Valor confirmado com sucesso</BannerText>
<Cross onClick={hideToaster}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
</Cross>
      </Container>
    );
  }
};

const Container = styled('div', {
  backgroundColor: '$black',
  borderRadius: '12px',
  padding: '1rem 1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});


const BannerText = styled('p', {
  color: '$white',
  fontSize: '$normal',
  fontWeight: '$normal',
  alignSelf: 'center'
});


const Cross = styled(Button,{
    backgroundColor: "$black",
    color: "$white",
    "&:active": {
        border: "1px solid $muted",
        backgroundColor: '$black',
      },
}) 

