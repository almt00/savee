import { styled } from '@stitches/react';
import useSWR from 'swr';
import Card from './Card';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from  'chart.js/auto';

const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(res => JSON.parse(res));


function Chart({ chartData }) {
  return <Doughnut 
        data={chartData}
      />
}
export default Chart; 