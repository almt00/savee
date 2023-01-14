import { styled } from '@stitches/react';
import useSWR from 'swr';
import Card from './Card';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(res => JSON.parse(res));

const Chart = props => {
  // let imagePath = "";
  // let taskTitle = "";

  let totalValue = '';

  //Set up SWR to run the fetcher function when calling api
  const { data, error } = useSWR('/api/user_1', fetcher);
  // const { data2, error2 } = useSWR('/api/user_2', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  if (data) {
    console.log(typeof data.hist_payment);
    console.log(data.hist_payment);
    // data.hist_payment.forEach(element => {
    //   totalValue = element.total_value;
    //   monthPercentage = element.percentage;
    // });
  }
  return (
    <Card>
      <DashboardContainer>
        {/* <TaskImage src={imagePath} alt={taskTitle} /> */}
        {/* <TaskTitle>{totalValue}</TaskTitle>
        <TaskTitle>{monthPercentage}</TaskTitle> */}
      </DashboardContainer>
    </Card>
  );
};

const DashboardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// const TaskImage = styled('img', {
//   width: '64px',
// });

const TaskTitle = styled('p', {
  fontSize: '$small',
  fontWeight: '$bold',
  color: '$black',
  marginTop: '0.5rem',
});

export default Chart;
