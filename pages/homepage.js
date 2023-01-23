import React from 'react';
import Layout from '../components/elements/Layout';
import Head from 'next/head';
import Header from '../components/elements/Header';
import Background from '../components/elements/Background';
import Banner from '../components/elements/Banner';
import DashboardCard from '../components/elements/DashboardCard';
import Tasks from '../components/dashboard/Tasks';
import RoutinesList from '../components/dashboard/RoutinesList';
import DisplayName from '../components/dashboard/DisplayName';

export default function Homepage() {
  const date = new Date().toLocaleDateString('pt-PT', {
    month: 'long',
    day: 'numeric',
  });
  const toDay = date.split(" ")[0];
  console.log("testing",toDay)

  return (
    <Layout title="Dashboard" description="Homepage for Savee">
      <Background color='mint' />
      <Header page='Homepage' />
      <div className='relative pt-20 px-6 flex flex-col gap-3 pb-6'>
        <DisplayName />
        <Banner toDay={toDay}/>
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
    </Layout>
  );
}
