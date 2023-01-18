import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { styled } from '@stitches/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useSWR from 'swr';


const data = {
  labels: ['User1', 'User2'],
  datasets: [
    {
      data: [60, 50],
      backgroundColor: ['rgb(8, 27, 51)', 'rgba(8, 27, 51, 0.1)'],
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

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const DoughnutChart = () => {
  // const { data_fetch, error } = useSWR('/api/tasks', fetcher);

  // //Handle the error state
  // if (error) return <div>Failed to load</div>;
  // //Handle the loading state
  // if (!data_fetch) return <div>Loading...</div>;

  // if (data_fetch) {
  //   console.log(data_fetch.hist_payment);
  // }

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
