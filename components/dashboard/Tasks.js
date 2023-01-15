import { styled } from "@stitches/react";
import Task from "../elements/Task";

// to do horizontal scroll

const Tasks = () => {
  return (
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
    gap: "1rem",
    "&:-webkit-scrollbar": {
        display: "none",
    },
});

export default Tasks;
