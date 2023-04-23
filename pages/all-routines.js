import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import Breadcrumb from "../components/elements/Breadcrumb";
import Link from "next/link";
import Button from "../components/elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser, getUser } from "../store/UserSlice";
import { fetchAsyncTasks, getTasks } from "../store/TasksSlice";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";

const AllRoutines = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const tasksData = useSelector(getTasks);
  dispatch(setPage("routines"));

  const userId = 1;
  let obj = "";
  let Routines = "";
  let type = "";
  let weekdays = "";
  let duration = "";
  let name = "";

  useEffect(() => {
    if (userData.status !== 200 && tasksData.status !== 200) {
      dispatch(fetchAsyncUser(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
      dispatch(fetchAsyncTasks());
    }
  }, [dispatch]);

  if (userData.status === 200 && tasksData.status === 200) {
    obj = userData.user.routines;
    Routines = obj?.map((routine, index) => {
      type = routine.task_id;
      weekdays = routine.weekdays;
      duration = routine.duration;

      name = tasksData.tasks?.find((task) => task.id === type).name;

      weekdays = weekdays.map((day) => {
        switch (day) {
          case 0:
            return "Dom";
          case 1:
            return "Seg";
          case 2:
            return "Ter";
          case 3:
            return "Qua";
          case 4:
            return "Qui";
          case 5:
            return "Sex";
          case 6:
            return "Sab";
          default:
            return "";
        }
      });

      weekdays = weekdays.join(", ");

      return (
        <>
          <Link href="">
            <Card type="stroke" key={index}>
              <CardItem
                className="flex justify-between items-center"
                key={index}
              >
                <RoutineInfo key={index}>
                  <H4>{name}</H4>
                  <p className="mt-1">{weekdays}</p>
                </RoutineInfo>
                <p className="text-muted">{duration} min</p>
              </CardItem>
            </Card>
          </Link>
        </>
      );
    });
  }

  return (
    <Layout title="Página para visualizar rotinas feitas e link para criar nova rotina" description="Rotinas">
      <Background color="purple" size="small" />
      <Header page="Rotinas" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <div className="flex justify-between">
          <Breadcrumb />
          <Link href="/create-routine">
            <Button bg="solid" size="lg">
              + nova rotina
            </Button>
          </Link>
        </div>
        {Routines}
      </div>
    </Layout>
  );
};

const RoutineInfo = styled("div", {
  p: {
    fontSize: "$small",
  },
});

const CardItem = styled("div", {
  p: {
    fontSize: "$small",
  },
});

const H4 = styled("h4", {
  fontSize: "$smallheading",
  fontWeight: "$bolder",
});

export default AllRoutines;
