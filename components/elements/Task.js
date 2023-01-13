import { styled } from "@stitches/react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

const Task = (props) => {
  // fetch image and name from API
  // to do map type to image e.g. aquecimento to heating.png

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  const { data, error } = useSWR("/api/staticdata", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <TaskContainer>
      <TaskImage src={props.img} alt={props.type} />
      <TaskTitle>{props.type}</TaskTitle>
    </TaskContainer>
  );
};

const TaskContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const TaskImage = styled("img", {
  width: "64px",
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginTop: "0.5rem",
});

export default Task;
