import { styled } from "@stitches/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";

const Entries = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const tasksData = useSelector(getTasks);

  let userId = 1;
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

  useEffect(() => {
    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  if (userData.status === 200 && tasksData.status === 200) {
    let userConsumeHist = userData.user.hist_use;
    let userRoutines = userData.user.routines;
    let userTasks = [...userConsumeHist, ...userRoutines]; // juntar dados rotinas com tasks
    let today = new Date();

    showEntrylist = userTasks.map((element, index) => {
      let startTime = new Date(element.start_date);
      let endTime = new Date(element.end_date);
      
      if (element.type === "routine") {
        // verificar se é rotina ou task
        verifyDay = false;
        element.weekdays.forEach((day) => {
          if (day === today.getDay()) {
            // verificar se a rotina acontece no dia da semana atual
            verifyDay = true;
          }
        });
        if (verifyDay === true && element.time_period === props.time) {
          // se for no mesmo dia e no mesmo periodo do dia
          let taskId = element.task_id;
          let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
          duration = element.duration;
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
          if (index === userConsumeHist.length - 1) {
            return (
              <EntryContainer key={element.id} className="border-b-0 mb-0">
                <EntryImage src={`${chosenTask.image}`}></EntryImage>
                <EntryTitle>{element.name}</EntryTitle>
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
          } else {
            return (
              <EntryContainer key={element.id}>
                <EntryImage src={`${chosenTask.image}`}></EntryImage>
                <EntryTitle>{element.name}</EntryTitle>
                <Minute>
                  {duration > 60 ? (
                    <>
                      <h3>{hours} </h3>
                      <p className="ml-1"> h </p>
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
      } else {
        // caso seja task, aprecido com o anterior com algumas verificações diferentes, deve haver melhor forma de fazer isto
        if (
          today.getFullYear() === startTime.getFullYear() &&
          today.getMonth() === startTime.getMonth() &&
          today.getDate() === startTime.getDate() &&
          startTime.getHours() >= intMin &&
          startTime.getHours() < intMax // verificações de dia e de altura do dia
        ) {
          let taskId = element.task_id;
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
          if (index === userConsumeHist.length - 1) {
            return (
              <EntryContainer key={element.id} className="border-b-0 mb-0">
                <EntryImage src={`${chosenTask.image}`}></EntryImage>
                <EntryTitle>{element.name}</EntryTitle>
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
          } else {
            return (
              <EntryContainer key={element.id}>
                <EntryImage src={`${chosenTask.image}`}></EntryImage>
                <EntryTitle>{element.name}</EntryTitle>
                <Minute>
                  {duration > 60 ? (
                    <>
                      <h3>{hours} </h3>
                      <p className="ml-1"> h </p>
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
      }
    });
  }
  return <div>{showEntrylist}</div>;
};

const EntryContainer = styled("div", {
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
  p: {
    fontSize: "$normal",
    fontWeight: "$bold",
  },
});

export default Entries;
