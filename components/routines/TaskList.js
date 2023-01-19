import { styled } from "@stitches/react";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Tasks = (props) => {

  // state to keep track of clicked task
  const [taskName, setTaskName] = useState("");

  // action to record the clicked task name
  const handleTaskName = (e) => {
    setTaskName(e.target.innerText);
  };

  // debugging state
  console.log(taskName);

  const { data, error } = useSWR("/api/tasks", fetcher);

  const tasks = data;

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    <TasksContainer>
      {data.tasks.map((task) => {
        return (
          <TaskButton
            key={task.name}
            // how to go to next step?
            onClick={handleTaskName}
          >
            <TaskContainer>
              <TaskImage src={task.image} alt={task.name} />
              <TaskTitle>{task.name}</TaskTitle>
            </TaskContainer>
          </TaskButton>
        );
      })}
    </TasksContainer>
  );
};

const TasksContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "1.125rem 1.5rem",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const TaskContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: ".5rem",
  borderBottom: "1px solid $border",
});

const TaskButton = styled("button", {
  "&:hover": {
    boxShadow: "$card",
    borderRadius: "12px",
  },
  "&:focus-visible": {
    border: "1px solid $links",
  },
});

const TaskImage = styled("img", {
  width: "2.5rem",
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginLeft: "0.5rem",
});

export default Tasks;
