import React from "react";
import Card from "./Card";
import Task from "./Task";
import Tip from "./Tip";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import { styled } from "../../stitches.config";

const Insight = (props) => {
  const dispatch = useDispatch();
  const tasksData = useSelector(getTasks);

  useEffect(() => {
    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  const heatingMessage = "Aqueceste o teu compartimento durante 35h este mês. Isto corresponde a 50% do teu valor a pagar.";
  const showerMessage = "Tomaste duche durante 36h este mês. Isto corresponde a 50% do teu valor a pagar.";
  const cookingMessage = "Cozinhaste durante 36h este mês. Isto corresponde a 50% do teu valor a pagar.";
  const bathMessage = "Tomaste banho de imersão durante 36h este mês. Isto corresponde a 50% do teu valor a pagar.";
  const laundryMessage = "Lavaste roupa durante 36h este mês. Isto corresponde a 50% do teu valor a pagar.";
  const hairdryerMessage = "Secaste o cabelo durante 36h este mês. Isto corresponde a 50% do teu valor a pagar.";

  let usageMessage = "";
  let tips = tasksData.tasks?.filter((task) => task.name === props.type)[0].tips[0];

  if (props.type === "Aquecimento") {
    usageMessage = heatingMessage;
  } else if (props.type === "Duche") {
    usageMessage = showerMessage;
  } else if (props.type === "Cozinhar") {
    usageMessage = cookingMessage;
  } else if (props.type === "Banho imersão") {
    usageMessage = bathMessage;
  } else if (props.type === "Lavar roupa") {
    usageMessage = laundryMessage;
  } else if (props.type === "Secar cabelo") {
    usageMessage = hairdryerMessage;
  }

  return (
    <>
      <Card size="sm" type="stroke">
        <div className="flex justify-between gap-2">
          <Task taskId={props.taskId} size="sm" />
          <div className="flex gap-1 items-center">
            <H4>{props.value}</H4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-danger"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          </div>
        </div>
        <div className="text-xs">
          <p className="text-xs">{usageMessage}</p>
        </div>
        <Tip classes="mt-2" content={tips}></Tip>
      </Card>
    </>
  );
};

const H4 = styled("h4", {
  fontSize: "$smallheading",
  fontWeight: "$bolder",
});

export default Insight;

