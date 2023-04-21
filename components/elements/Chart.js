import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { styled } from '@stitches/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DoughnutChart = props => {
  let border = '';
  let background = '';
  let cutoutPercentage = '';
  if (props.environment === 'payment') {
    background = ['#FFFFFF', '#FFFFFF', '#C5E1F2'];
    border = '#081B33';
    cutoutPercentage = 80;
  } else {
    background = ['#B0B0B050', '#B0B0B050', '#081B33'];
    border = '#FFFFFF';
    cutoutPercentage = 30;
  }

  let totalValue = 55; //não consegui colocar o 55 na linha inferior
  let ourUserValue = 22.5;
  let message = ourUserValue + '€';

  const data = {
    labels: ['User3', 'User2', 'User1'],
    datasets: [
      {
        data: [20, 25, 55],
        backgroundColor: background,
        borderColor: border,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    cutout: cutoutPercentage,
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

  const plugins = [
    {
      beforeDraw: function (chart) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 120).toFixed(2);
        ctx.font = fontSize + 'em Verdana, sans-serif';
        ctx.textBaseline = 'middle';
        let text = message,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
  return (
    <Doughnut
      alt="grafico"
      data={data}
      options={options}
      plugins={props.environment === 'payment' ? plugins : [ChartDataLabels]}
    />
  );
};

export default DoughnutChart;
