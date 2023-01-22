import Layout from '../components/elements/Layout';
import Header from '../components/elements/Header';
import Background from '../components/elements/Background';
import Banner from '../components/elements/Banner';
import DashboardCard from '../components/elements/DashboardCard';
import Tasks from '../components/dashboard/Tasks';
import RoutinesList from '../components/dashboard/RoutinesList';
import DisplayName from '../components/dashboard/DisplayName';
import React, { useEffect, useState } from 'react';

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

export default function Homepage() {
  const size = useWindowSize();
  const width = size.width;
  console.log(size.width);

  const date = new Date().toLocaleDateString('pt-PT', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout title='Dashboard' description='Homepage for Savee'>
      <>
        {width > 500 ? (
          <div className='h-screen bg-gray-50 flex items-center justify-center p-5'>
            <img src='/img/logo.svg' className='mr-5' alt='Savee logo' />
            <h3 className=''>
              Esta plataforma só está preparada para mobile.   
            </h3>
          </div>
        ) : (
          <>
            <Background color='mint' />
            <Header page='Homepage' />
            <div className='relative pt-20 px-6 flex flex-col gap-3 pb-6'>
              <DisplayName />
              <Banner />
              <DashboardCard />
              <Tasks />
              <div>
                <div className='flex justify-between items-center'>
                  <h3>Hoje</h3>
                  <p className='text-muted'>{date}</p>
                </div>
              </div>
              <RoutinesList />
            </div>
          </>
        )}
      </>
    </Layout>
  );
}
