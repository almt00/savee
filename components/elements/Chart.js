// ./components/LineChart.js

import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { styled } from "@stitches/react";

const labels = ['user1', 'user2'];

const data = {
  labels: ['User1', 'User2'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [50, 50],
      backgroundColor: [
        'rgb(8, 27, 51)',
        'rgba(8, 27, 51, 0.1)',
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
