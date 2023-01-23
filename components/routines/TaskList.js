import { styled } from "@stitches/react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchAsyncTasks,getTasks } from "../../store/TasksSlice";

const Tasks = ({ onClickEvent }) => {

  const dispatch = useDispatch();
  const tasksData = useSelector(getTasks);
  
  useEffect(() => {
    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  if(tasksData.status === 200){
    return (
    // todo map tasks
    <TasksContainer>
      {tasksData.tasks.map((task) => {
        return (
          <TaskContainer key={task.name} onClick={onClickEvent}>
            <TaskImage src={task.image} alt={task.name} />
            <TaskTitle>{task.name}</TaskTitle>
          </TaskContainer>
        );
      })}
    </TasksContainer>
  ); 
  }
  
};

const TasksContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "1.125rem 1.5rem",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const TaskContainer = styled("button", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: ".5rem",
  borderBottom: "1px solid $border",
});

const TaskImage = styled("img", {
  width: "2.5rem",
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginLeft: "0.5rem",
});
export default Tasks;
