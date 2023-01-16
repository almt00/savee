// ./components/LineChart.js

import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const labels = ['user1', 'user2'];

const data = {
  labels: ['User1', 'User2'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4,
    },
  ],
};

const DoughnutChart = () => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
