import { styled } from "@stitches/react";

const Task = (props) => {

// fetch image and name from API
// to do map type to image e.g. aquecimento to heating.png

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
