import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { styled } from '@stitches/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(res => JSON.parse(res));

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

const DoughnutChart = () => {
  // let imagePath = "";
  // let taskTitle = "";

  //Set up SWR to run the fetcher function when calling api
  const { data1, error } = useSWR('/api/user_1', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data1) return <div>Loading...</div>;

  if (data1) {
    console.log(typeof data.hist_payment);
    console.log(data1.hist_payment);
    // data.tasks.forEach((task) => {
    //   if (task.name === props.type) {
    //     imagePath = task.image;
    //     taskTitle = task.name;
    //   }
    // });
  }
  return (
    
      <Container>
        <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
      </Container>
    
  );
};

export default DoughnutChart;

const Container = styled('div', {
  width: '30%',
});
