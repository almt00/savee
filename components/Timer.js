import React, { useEffect, useState } from "react";
import Button from "./elements/Button";
import Tip from "./elements/Tip";
import { styled } from "@stitches/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Timer(props) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState("text-muted");
  const [startTime, setStartTime] = useState(null);
  const userId = Cookies.get("userId");

  let taskId;
  const router = useRouter();
  const query = router.query; // ir buscar query string ao URL
  if (query === {} || query.id === undefined || props.taskId) {
    // ver se esta task vem com info de props ou da query string
    taskId = props.taskId; // passar para inteiro para comparar com id da API
  } else {
    taskId = parseInt(query.id); // passar para inteiro para comparar com id da API
  }

  const handleSubmit = async (event) => {
    const data = {
      start_time: startTime,
      end_time: new Date(),
      duration: parseInt(time / 1000),
      task: taskId,
    };

    console.log(data);

    const JSONdata = JSON.stringify(data);

    const endpoint = `https://savee-api.vercel.app/user/${userId}/task`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    if (result.success) {
      //router.push("/homepage");
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
