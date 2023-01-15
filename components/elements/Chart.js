// import { styled } from '@stitches/react';
// import useSWR from 'swr';
// import Card from './Card';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS } from  'chart.js/auto';

// const fetcher = url =>
//   fetch(url)
//     .then(res => res.json())
//     .then(res => JSON.parse(res));


// function Chart() {
//   let totalValue = 55;

//   const { data, error } = useSWR('/api/user_1', fetcher);

//   //Handle the error state
//   if (error) return <div>Failed to load</div>;
//   //Handle the loading state
//   if (!data) return <div>Loading...</div>;

//   if (data) {
//     console.log(typeof data.hist_payment);
//     console.log(data.hist_payment);
//     // data.hist_payment.forEach(element => {
//     //   totalValue = element.total_value;
//     //   monthPercentage = element.percentage;
//     // });
//   }

//   return <Doughnut data={totalValue}/>
// }
// export default Chart; 