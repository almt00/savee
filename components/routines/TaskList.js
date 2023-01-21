import { styled } from "@stitches/react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Tasks = ({ onClickEvent }) => {
  const { data, error } = useSWR("/api/tasks", fetcher);

  const tasks = data;
  console.log(tasks);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    // todo map tasks
    <TasksContainer>
      {data.tasks.map((task) => {
        return (
          <TaskContainer key={task.name} onClick={onClickEvent}>
            <TaskImage src={task.image} alt={task.name} />
            <TaskTitle>{task.name}</TaskTitle>
          </TaskContainer>
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

const TaskContainer = styled("button", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: ".5rem",
  borderBottom: "1px solid $border",
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
