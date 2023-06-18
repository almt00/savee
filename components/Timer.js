import React, { useEffect, useState } from "react";
import Button from "./elements/Button";
import Tip from "./elements/Tip";
import { styled } from "@stitches/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../store/TasksSlice";
import {
  fetchAsyncPaymentGroupSlice,
  getPaymentGroup,
} from "../store/PaymentGroupSlice";

export default function Timer(props) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState("text-muted");
  const [startTime, setStartTime] = useState(null);
  const userId = Cookies.get("userId");
  const houseId = Cookies.get("houseId");
  const paymentData = useSelector(getPaymentGroup);
  const tasksData = useSelector(getTasks);
  let taskId;
  const router = useRouter();
  const query = router.query; // ir buscar query string ao URL
  if (query === {} || query.id === undefined || props.taskId) {
    // ver se esta task vem com info de props ou da query string
    taskId = props.taskId; // passar para inteiro para comparar com id da API
  } else {
    taskId = parseInt(query.id); // passar para inteiro para comparar com id da API
  }
  useEffect(() => {
    if (paymentData.status !== 200) {
      dispatch(fetchAsyncPaymentGroupSlice(houseId)); // fazer o fetch com
      console.log("fetch");
    }
  }, [dispatch]);

  const handleSubmit = async () => {
    if (tasksData.status === 200) {
      let task_duration = parseInt(time / 1000) / 60 / 60;
      let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
      let consumption_value = chosenTask.kw_hour * task_duration;

      const data_task = {
        start_time: startTime,
        end_time: new Date(),
        duration: parseInt(time / 1000),
        task: taskId,
      };

      const JSONdataTask = JSON.stringify(data_task);
      const endpoint_task = `https://savee-api.vercel.app/user/${userId}/task`;
      const options_task = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
        body: JSONdataTask,
      };
      const response_task = await fetch(endpoint_task, options_task);
      const result_task = await response_task.json();

      if (result_task.success) {
        const task_id = result_task.task.task_id;
        console.log("response", result_task);
        const data_consumption = {
          house_id: houseId,
          payment_id: paymentData?.paymentGroup[0].payment_id,
          routine_id: null,
          task_id: task_id,
          consumption: consumption_value,
          type: 1,
        };
        const JSONdataConsumption = JSON.stringify(data_consumption);
        const endpoint_consumption = `https://savee-api.vercel.app/consumption/user/${userId}`;
        const options_consumption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
          body: JSONdataConsumption,
        };
        const response_consumption = await fetch(
          endpoint_consumption,
          options_consumption
        );
        const result_consumption = await response_consumption.json();
        console.log(result_consumption);
      }
    }
  };

  useEffect(() => {
    let interval;

    if (running) {
      setTime(0);
      let start_time = new Date();
      setStartTime(start_time);
      setColor("text-black");
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!running) {
      setColor("text-muted");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <div
        className={`flex gap-6 justify-center text-center p-3 mt-6 ${color}`}
      >
        <div>
          <p>hr</p>
          <H4 className={`xlargeheading`}>
            {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}
          </H4>
        </div>
        <div>
          <p>min</p>
          <H4 className={`xlargeheading`}>
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
          </H4>
        </div>
        <div>
          <p>sec</p>
          <H4 className={`xlargeheading`}>
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
          </H4>
        </div>
      </div>
      {running ? (
        <Button
          aria-label="click para parar o contador de tempo"
          bg="danger"
          className="p-4 mt-6"
          onClick={() => {
            setRunning(false);
            handleSubmit();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      ) : (
        <>
          <Button
            aria-label="click para começar o contador de tempo"
            bg="solid"
            className="p-4 mt-6"
            onClick={() => setRunning(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </Button>
        </>
      )}
      {running === false && time > 0 ? (
        <Tip content="Foste super rápido! 21% das pessoas demoram mais tempo que tu."></Tip>
      ) : (
        ""
      )}
    </>
  );
}

const H4 = styled("h4", {
  fontSize: "$xxlargeheading",
  fontWeight: "$bolder",
});
