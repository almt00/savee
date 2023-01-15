import { styled } from "@stitches/react";
import Task from "../elements/Task";

const Tasks = () => {
  return (
    // todo map tasks
    <TasksContainer>
      <Task type="Aquecimento" />
      <Task type="Banho imersão" />
      <Task type="Duche" />
      <Task type="Cozinhar" />
      <Task type="Secar cabelo" />
      <Task type="Lavar roupa" />
    </TasksContainer>
  );
};

const TasksContainer = styled("div", {
    display: "flex",
    overflowX: "auto",
    margin: "1.125rem 1.5rem",
    gap: "2rem",
    "&::-webkit-scrollbar": {
        display: "none",
    },
});

export default Tasks;
