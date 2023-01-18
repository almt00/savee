import { styled } from "@stitches/react";
import React from "react";

export default function Summary(props) {
  return (
    <TaskContainer>
      <TaskImage src={"/img/heating@2x.png"} alt="Aquecimento" />
      <div>
        <TaskTitle>Aquecimento</TaskTitle>
        <p>Seg / Qui / Sáb </p>
        <p>Manhã </p>
        <p>5 min 20 seg </p>
      </div>
    </TaskContainer>
  );
}
const TaskContainer = styled("div", {
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  alignItems: "center",
  padding: "0",
  marginBottom: ".5rem",
  p: {
    fontSize: "$small",
  },
});

const TaskImage = styled("img", {
  margin: "0 auto",
  width: "4rem",
  margin: 0,
});

const TaskTitle = styled("h6", {
  fontWeight: "$bolder",
  color: "$black",
  fontSize: "$normal",
  marginTop: "0",
});
