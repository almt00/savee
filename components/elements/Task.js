import { styled } from "@stitches/react";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Task = (props) => {
  let imagePath = "";
  let taskTitle = "";

  //Set up SWR to run the fetcher function when calling api
  const { data, error } = useSWR("/api/tasks", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  if (data) {
    console.log(typeof data.tasks);
    console.log(data.tasks);
    data.tasks.forEach((task) => {
      if (task.name === props.type) {
        imagePath = task.image;
        taskTitle = task.name;
      }
    });
  }
  return (
    <TaskContainer size={props.size}>
      <TaskImage src={imagePath} alt={taskTitle} size={props.size} />
      <TaskTitle size={props.size}>{taskTitle}</TaskTitle>
    </TaskContainer>
  );
};

const TaskContainer = styled("div", {
  flex: "0 0 auto",
  textAlign: "center",
  variants: {
    size: {
      sm: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
        padding: "0",
        marginBottom: ".5rem"
      },
      lg: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
        padding: ".625rem",
      },
    },
  },
});

const TaskImage = styled("img", {
  width: "4rem",
  margin: "0 auto",
  variants: {
    size: {
      sm: {
        width: "2.5rem",
        margin: 0,
      },
      lg: {
        width: "6.875rem",
        margin: 0,
      },
    },
  },
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginTop: "0.5rem",
  variants: {
    size: {
      sm: {
        fontSize: "$small",
        fontWeight: "$bold",
        marginTop: "0",
      },
      lg: {
        fontSize: "$h3",
        fontWeight: "$bolder",
        marginTop: "0",
      },
    },
  },
});

export default Task;
