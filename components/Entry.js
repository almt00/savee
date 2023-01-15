import { styled } from "@stitches/react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Entry = () => {

//Set up SWR to run the fetcher function when calling api
const { data, error } = useSWR("/api/tasks", fetcher);

//Handle the error state
if (error) return <div>Failed to load</div>;
//Handle the loading state
if (!data) return <div>Loading...</div>;
console.log(data.tasks);


const showEntrylist = data.tasks.map((task)=>

<EntryContainer key={task.id}>
    <EntryImage src={`../public/img/${task.image}`}></EntryImage>
    <EntryTitle>{task.name}</EntryTitle>
    <Minute>
        {Math.floor(task.default_time / 60000)}
         <p>min</p>
    </Minute>
   
</EntryContainer>
)
    return(
        <div>
            {showEntrylist}
        </div>
    )
}

const EntryContainer = styled("div", {
    display: "flex",
    marginInline: "1rem",
    flexdirection: "row",
    alignItems: "center",
    height: "56px",
    width: "310px",
  });
  const EntryImage = styled("img", {
    width: "40px",
    alignItems: "center",
    justifyContent: "center"
  });
  const EntryTitle = styled("h3", {
    fontSize: "$small",
    fontWeight: "$bold",
    color: "$black"
  });
  const Minute = styled("div",{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "$bold",
    fontSize: "20px",
    color: "$black",
    marginLeft: "auto",
    p: {
        fontSize: "$small",
        fontWeight: "$bold",
    }
  })

export default Entry;