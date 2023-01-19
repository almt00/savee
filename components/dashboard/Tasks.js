import { styled } from "@stitches/react";
import Task from "../elements/Task";
import useSWR from "swr";
import Link from 'next/link'


const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const Tasks = () => {
  const { data, error } = useSWR("/api/tasks", fetcher);

  const tasks = data;
  console.log(tasks);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    // todo map tasks 
    <div className="mt-6">
      <h3>Tarefas</h3>
    <TasksContainer>
      {data.tasks.map((task) => {
        return (
          <TaskContainer key={task.name}>
            <Link href="/task">
            <TaskImage src={task.image} alt={task.name} />
            <TaskTitle>{task.name}</TaskTitle>
            </Link>
          </TaskContainer>
        );
      })}
    </TasksContainer>
    </div>
  );
};

const TasksContainer = styled("div", {
  display: "flex",
  overflowX: "auto",
  margin: "1.125rem 0",
  gap: "1.7rem",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const TaskContainer = styled("div", {
  flex: "0 0 auto",
  textAlign: "center",
});

const TaskImage = styled("img", {
  width: "64px",
  margin: "0 auto",
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginTop: "0.5rem",
});
export default Tasks;
