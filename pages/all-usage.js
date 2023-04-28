import Layout from "../components/elements/Layout";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Breadcrumb from "../components/elements/Breadcrumb";
import Background from "../components/elements/Background";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncConsumption,
  getConsumption,
} from "../store/ConsumptionSlice";
import { fetchAsyncTasks, getTasks } from "../store/TasksSlice";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";

const AllUsage = () => {
  const dispatch = useDispatch();
  const consumptionData = useSelector(getConsumption);
  const tasksData = useSelector(getTasks);
  const userId = 1;
  let UseHisto = "";
  let obj = "";
  let taskName = "";
  let taskId = "";
  let taskInit = "";
  let taskEnd = "";
  let taskDuration = "";
  let date = "";
  let cleanDate = "";
  let cleantaskDuration = "";
  let today = new Date();
  let cleanToday = "";
  let todaySum = 0;

  useEffect(() => {
    dispatch(setPage("usage"));
  }, []);

  useEffect(() => {
    if (consumptionData.status !== 200) {
      dispatch(fetchAsyncConsumption(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks());
    }
  }, [dispatch]);

  if (consumptionData.status === 200 && tasksData.status === 200) {
    obj = consumptionData.consumption;
    UseHisto = obj.map((use, index) => {
      taskId = use.task?.task || use.routine?.task;
      // assign task name to taskId
      taskName = tasksData.tasks.find((task) => task.id === taskId).name;
      taskInit = new Date(use.task?.start_time);
      taskEnd = new Date(use.task?.end_time);
      taskDuration = new Date(taskEnd - taskInit);
      // calculate routine duration
      if (use.routine) {
        taskDuration = new Date(use.routine.duration_routine * 1000);
      }
      date = use.consumption_date;
      const options = { month: "short", day: "numeric" };
      cleanToday = new Date(today).toLocaleDateString("pt-PT", options);
      cleanDate = new Date(date).toLocaleDateString("pt-PT", options);
      cleantaskDuration = Math.floor(taskDuration / 1000 / 60);
      if (cleanToday === cleanDate && cleantaskDuration > 0) {
        todaySum += cleantaskDuration;
      }
      return (
        <>
          <Card type="stroke" key={index}>
            <CardItem className="flex justify-between items-center" key={index}>
              <UsageInfo key={index}>
                <H3>{cleantaskDuration} min</H3>
                <p> {taskName}</p>
              </UsageInfo>
              <p className="text-muted">{cleanDate}</p>
            </CardItem>
          </Card>
        </>
      );
    });
  }

  return (
    <Layout title="Página que permite visualizar o histórico de tarefas realizadas cronologicamente da mais recente para a mais antiga." description="Histórico de uso">
      <Background color="orange" size="small" />
      <Header page="Histórico uso" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
      <Breadcrumb />
        <Card>
          <ThisMonth>{todaySum} min</ThisMonth>
          <p className="mt-2">Hoje</p>
        </Card>
        <H2 className="mt-6">Histórico de uso</H2>
        <div className="flex flex-col-reverse gap-3">{UseHisto}</div>
      </div>
    </Layout>
  );
};
const H3 = styled("h3", {
  fontSize: "$smallheading",
  fontWeight: "$bolder",
});

const H2 = styled("h2", {
  fontSize: "$largeheading",
  fontWeight: "$bolder",
});

const ThisMonth = styled("div", {
  color: "$black",
  fontSize: "$xxlargeheading",
  fontWeight: "$bolder",
  lineHeight: "3rem",
});
const UsageInfo = styled("div", {
  p: {
    fontSize: "$small",
  },
});

const CardItem = styled("div", {
  p: {
    fontSize: "$small",
  },
});
export default AllUsage;
