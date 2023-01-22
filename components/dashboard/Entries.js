import { styled } from "@stitches/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";

const Entries = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const tasksData = useSelector(getTasks);
  let userId = 1;
  let showEntrylist;
  let timeUnit = "min";
  let hours = 0;
  let min = 0;

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
    showEntrylist = userConsumeHist.map((element, index) => {
      let taskId = element.task_id;
      let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
      let startTime = new Date(element.start_date);
      let endTime = new Date(element.end_date);
      let duration = Math.round(
        (endTime.getTime() - startTime.getTime()) / 1000 / 60
      ); // duraçao em min
      if (duration >= 60) {
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
            {duration >= 60 ? (
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
              {duration >= 60 ? (
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
