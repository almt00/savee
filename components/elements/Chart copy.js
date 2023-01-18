import React from 'react';


import useSWR from 'swr';



//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Test= () => {
  const { data, error } = useSWR('/api/user_1', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) {
    console.log(data);
    return <div>Loading...</div>;
  } 

  if (data) {
    console.log(data.hist_payment);
  }

  return (
   <p></p>
  );
};

export default Test;
