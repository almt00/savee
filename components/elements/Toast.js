import { styled } from '@stitches/react';
import { useState } from 'react';

export default function Toast(props) {
  const [isShown, setIsShown] = useState(true);
  const [timeOut, setTimeOut] = useState(null);

  setTimeout(() => {
    setTimeOut(1);
  }, 5000);

  const hideToaster = event => {
    // 👇️ set it to true
    setIsShown(false);
  };

  if (isShown == true && timeOut !== 1) {
    return (
      <Container className={`toast ${props.className}`}>
        <BannerText>Valor confirmado com sucesso</BannerText>
        <Cross onClick={hideToaster}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </Cross>
      </Container>
    );
  }
}

const Container = styled('div', {
  backgroundColor: '$black',
  borderRadius: '12px',
  padding: '1rem 1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  margin: '1rem 1.5rem',
  zIndex: '1',
});

const BannerText = styled('p', {
  color: '$white',
  fontSize: '$normal',
  fontWeight: '$normal',
  alignSelf: 'center',
});

const Cross = styled('button', {
  backgroundColor: '$black',
  color: '$white',
  '&:active': {
    border: '1px solid $muted',
    backgroundColor: '$black',
  },
});
