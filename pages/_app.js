import '../styles/globals.css';
import { Inter } from '@next/font/google';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function App({ Component, pageProps }) {
  const size = useWindowSize();
  const width = size.width;
  console.log(size.width);

  return (
    <Provider Provider store={store}>
      <main className={inter.className}>
        {width > 450 ? (
          <div className='h-screen bg-gray-50 flex items-center justify-center p-5'>
            <img src='/img/logo.svg' className='mr-5' alt='Savee logo' />
            <h3 className=''>Esta plataforma só está preparada para mobile.</h3>
          </div>
        ) : (
          <>
            <Component {...pageProps} />
          </>
        )}
      </main>
    </Provider>
  );
}
