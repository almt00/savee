import { styled } from "@stitches/react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Entries = () => {

  //Set up SWR to run the fetcher function when calling api
  const { data, error } = useSWR("/api/tasks", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  console.log(data.tasks);


  const showEntrylist = data.tasks.map((task) =>

    <EntryContainer key={task.id}>
      <EntryImage src={`${task.image}`}></EntryImage>
      <EntryTitle>{task.name}</EntryTitle>
      <Minute>
        <h3>
          {Math.floor(task.default_time / 60000)}
        </h3>
        <p className="ml-1">min</p>
      </Minute>
    </EntryContainer>
  )
  
  return (
    <div>
      {showEntrylist}
    </div>
  )
}

const EntryContainer = styled("div", {
  display: "flex",
  padding: "0.5rem",
  marginBottom: "0.25rem",
  flexdirection: "row",
  alignItems: "center",
  height: "3.5rem",
  borderBottom: "1px solid $border",
});
const EntryImage = styled("img", {
  width: "2.5rem",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "0.5rem",
});
const EntryTitle = styled("h3", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black"
});
const Minute = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "auto",
  p: {
    fontSize: "$normal",
    fontWeight: "$bold",
  }
})

export default Entries;