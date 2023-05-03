import { styled } from "@stitches/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import { useRouter } from "next/router";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const Task = (props) => {
  let taskId;
  const router = useRouter();
  const query = router.query; // ir buscar query string ao URL
  if (query === {} || query.id === undefined || props.taskId) {
    // ver se esta task vem com info de props ou da query string
    taskId = props.taskId; // passar para inteiro para comparar com id da API
  } else {
    taskId = parseInt(query.id); // passar para inteiro para comparar com id da API
  }
  const dispatch = useDispatch();
  const tasksData = useSelector(getTasks);
  let imagePath = "";
  let taskTitle = "";

  useEffect(() => {
    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  if (tasksData.status === 200) {
    tasksData.tasks.forEach((task) => {
      if (task.id === taskId) {
        imagePath = task.image;
        taskTitle = task.name;
      }
    });
  }
  return (
    <TaskContainer size={props.size}>
      <TaskImage src={imagePath} alt={taskTitle} size={props.size} />
      <TaskTitle size={props.size} aria-hidden="true">
        {taskTitle}
      </TaskTitle>
    </TaskContainer>
  );
};

const TaskContainer = styled("div", {
  flex: "0 0 auto",
  textAlign: "center",
  variants: {
    size: {
      sm: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
        padding: "0",
        marginBottom: ".5rem",
      },
      lg: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
        padding: ".625rem",
      },
    },
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
    },
  },
});

const TaskImage = styled("img", {
  width: "4rem",
  margin: "0 auto",
  variants: {
    size: {
      sm: {
        width: "2.5rem",
        margin: 0,
      },
      lg: {
        width: "6.875rem",
        margin: 0,
      },
    },
  },
});

const TaskTitle = styled("p", {
  fontSize: "$small",
  fontWeight: "$bold",
  color: "$black",
  marginTop: "0.5rem",
  variants: {
    size: {
      sm: {
        fontSize: "$small",
        fontWeight: "$bold",
        marginTop: "0",
      },
      lg: {
        fontSize: "$mediumheading",
        fontWeight: "$bolder",
        marginTop: "0",
      },
    },
  },
});

export default Task;
