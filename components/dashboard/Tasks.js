import { styled } from "@stitches/react";
import Task from "../elements/Task";
import Link from "next/link";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/* const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));
 */
const Tasks = () => {
  const dispatch = useDispatch();
  const tasksData = useSelector(getTasks);

  useEffect(() => {
    dispatch(fetchAsyncTasks()); // fazer o fetch com redux~
    console.log(tasksData);
  }, [dispatch]);

  const renderTasks = () => {
    if (tasksData.status === 200) {
      return tasksData.tasks.map((task) => {
        return (
          <TaskContainer key={task.name}>
            <Link href="/task">
              <TaskImage src={task.image} alt={task.name} />
              <TaskTitle>{task.name}</TaskTitle>
            </Link>
          </TaskContainer>
        );
      });
    }
  };

  return (
    // todo map tasks
    <div className="mt-6">
      <h3>Tarefas</h3>
      <TasksContainer>{renderTasks()}</TasksContainer>
    </div>
  );
};

const TasksContainer = styled("div", {
  display: "flex",
  overflowX: "auto",
  margin: "1.125rem 0",
  gap: "1.7rem",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const TaskContainer = styled("div", {
  flex: "0 0 auto",
  textAlign: "center",
});

const TaskImage = styled("img", {
  width: "64px",
  margin: "0 auto",
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginTop: "0.5rem",
});
export default Tasks;
