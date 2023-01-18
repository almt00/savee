import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { styled } from '@stitches/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useSWR from 'swr';

const data = {
  labels: ['User2', 'User1'],
  datasets: [
    {
      data: [60, 50],
      backgroundColor: ['#B0B0B050', '#081B33'],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: '100',
    },
  },
};

const DoughnutChart = () => {
  return (
    <Container>
      <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
    </Container>
  );
};

const Container = styled('div', {
  width: '30%',
});

export default DoughnutChart;
