import { styled } from "@stitches/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import {
  fetchAsyncConsumptionSlice,
  getConsumption,
} from "../../store/ConsumptionSlice";
import {
  fetchAsyncConsumptionToday,
  getConsumptionToday,
} from "../../store/ConsumptionTodaySlice";
import Cookies from "js-cookie";

const Entries = (props) => {
  const dispatch = useDispatch();
  const tasksData = useSelector(getTasks);
  const consumptionTodayData = useSelector(getConsumptionToday);

  const id = Cookies.get("userId");
  let showEntrylist;
  let timeUnit = "min";
  let duration = 0;
  let hours = 0;
  let min = 0;
  let intMin;
  let intMax;
  let verifyDay = false;

  if (props.time === "morning") {
    intMin = 0;
    intMax = 12;
  }
  if (props.time === "afternoon") {
    intMin = 12;
    intMax = 19;
  }
  if (props.time === "night") {
    intMin = 19;
    intMax = 24;
  }

  if (consumptionTodayData.status === 200) {
    let userTasks = consumptionTodayData.consumption_today; // juntar dados rotinas com tasks

    showEntrylist = userTasks.map((element, index) => {
      let consumption_time = new Date(element.consumption_date).getHours();

      if (element.type === 0) {
        if (consumption_time >= intMin && consumption_time < intMax) {
          let taskId = element.routine.task;
          let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
          duration = element.routine.duration_routine / 60;
          if (duration > 60) {
            // se for mais que 1h formatar numeros
            min = duration % 60;
            hours = Math.floor(duration / 60);
            timeUnit = `${hours} h ${min} min`;
          } else {
            min = duration;
            hours = 0;
            timeUnit = `${min} min`;
          }
          return (
            <EntryContainer
              key={element.consumption_id}
              className="border-b-0 mb-0"
            >
              <EntryImage
                src={`${chosenTask.image}`}
                alt={`${chosenTask.name}`}
              ></EntryImage>
              <EntryTitle aria-hidden="true">{chosenTask.name}</EntryTitle>
              <Minute>
                {duration > 60 ? (
                  <>
                    <h3>{hours} </h3>
                    <p className="ml-1">h </p>
                    <h3 className="ml-1">{min} </h3>
                    <p className="ml-1"> min</p>
                  </>
                ) : (
                  <>
                    <h3>{min}</h3>
                    <p className="ml-1">min</p>
                  </>
                )}
              </Minute>
            </EntryContainer>
          );
        }
      } else {
        let today = new Date();
        let startTime = new Date(element.task.start_time);
        let endTime = new Date(element.task.end_time);

        // caso seja task, aprecido com o anterior com algumas verificações diferentes, deve haver melhor forma de fazer isto
        if (consumption_time >= intMin && consumption_time < intMax) {
          let taskId = element.task.task;
          let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
          duration = Math.round(
            (endTime.getTime() - startTime.getTime()) / 1000 / 60
          ); // duraçao em min

          if (duration > 60) {
            min = duration % 60;
            hours = Math.floor(duration / 60);
            timeUnit = `${hours} h ${min} min`;
          } else {
            min = duration;
            hours = 0;
            timeUnit = `${min} min`;
          }

          return (
            <EntryContainer
              key={element.consumption_id}
              className="border-b-0 mb-0"
            >
              <EntryImage src={`${chosenTask.image}`}></EntryImage>
              <EntryTitle>{chosenTask.name}</EntryTitle>
              <Minute>
                {duration > 60 ? (
                  <>
                    <h3>{hours} </h3>
                    <p className="ml-1">h </p>
                    <h3 className="ml-1">{min} </h3>
                    <p className="ml-1"> min</p>
                  </>
                ) : (
                  <>
                    <h3>{min}</h3>
                    <p className="ml-1">min</p>
                  </>
                )}
              </Minute>
            </EntryContainer>
          );
        }
      }
    });
  }
  return <>{showEntrylist}</>;
};

const EntryContainer = styled("li", {
  display: "flex",
  margin: "0 1rem 0.25rem 1rem",
  flexdirection: "row",
  alignItems: "center",
  height: "3.5rem",
  borderBottom: "1px solid $border",
});
const EntryImage = styled("img", {
  width: "2.5rem",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "0.5rem",
});
const EntryTitle = styled("h3", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
});
const Minute = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "auto",
  h3: {
    fontSize: "$normal",
    fontWeight: "$bold",
  },
  p: {
    fontSize: "$normal",
    fontWeight: "$bold",
  },
});

export default Entries;
