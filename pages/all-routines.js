import Layout from "../components/elements/Layout";
import withAuth from "../components/withAuth";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import Breadcrumb from "../components/elements/Breadcrumb";
import Link from "next/link";
import Button from "../components/elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTasks, getTasks } from "../store/TasksSlice";
import { fetchAsyncRoutineSlice, getRoutine } from "../store/RoutineSlice";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const AllRoutines = () => {
  const dispatch = useDispatch();
  const routineData = useSelector(getRoutine);
  const tasksData = useSelector(getTasks);
  const userId = Cookies.get("userId");
  const router = useRouter();

  const handleDelete = async (routineId) => {
    const deleteEndpoint = `https://savee-api.vercel.app/user/${userId}/routine/${routineId}`;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    };

    const response = await fetch(deleteEndpoint, options);
    const result = await response.json();

    if (result.success) {
      dispatch(fetchAsyncRoutineSlice(userId));
      router.push("/all-routines");
    }

    console.log(result);
  };

  useEffect(() => {
    if (routineData.status !== 200) {
      dispatch(fetchAsyncRoutineSlice(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }

    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPage("routines"));
  }, []);

  return (
    <Layout
      description="Página para visualizar rotinas feitas e link para criar nova rotina"
      title="Rotinas"
    >
      <Background color="purple" size="extrasmall" />
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
        {routineData.status === 200 &&
          tasksData.status === 200 &&
          routineData.routine?.map((routine, index) => {
            const type = routine.task;
            const weekdays = routine.weekdays;
            const periods = routine.period_time;
            const duration = Math.round(routine.duration_routine / 60);
            const routineId = routine.routine_id;
            const name =
              tasksData.tasks?.find((task) => task.id === type)?.name || "";
            const image =
              tasksData.tasks?.find((task) => task.id === type)?.image || "";

            const weekdayNames = [
              "Dom",
              "Seg",
              "Ter",
              "Qua",
              "Qui",
              "Sex",
              "Sab",
            ];
            const formattedWeekdays = weekdays
              .map((day) => weekdayNames[day])
              .join(", ");
            const formattedPeriods = periods
              .map((period) => {
                switch (period) {
                  case "morning":
                    return "Manhã";
                  case "afternoon":
                    return "Tarde";
                  case "night":
                    return "Noite";
                  default:
                    return "";
                }
              })
              .join(", ");

            return (
              <Card type="stroke" key={index}>
                <CardItem
                  className="flex justify-between items-center"
                  key={index}
                >
                  <TaskImage src={image} alt={name} />
                  <RoutineInfo key={index}>
                    <H4>{name}</H4>
                    <p className="mt-1">{formattedWeekdays}</p>
                    <p className="mt-1">{formattedPeriods}</p>
                    <p className="mt-1">{duration} min</p>
                  </RoutineInfo>
                  <Button
                    bg="danger"
                    size="md"
                    onClick={() => handleDelete(routineId)}
                  >
                    Apagar
                  </Button>
                </CardItem>
              </Card>
            );
          })}
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
  paddingLeft: "1rem",
  paddingRight: "1rem",
});

const H4 = styled("h4", {
  fontSize: "$smallheading",
  fontWeight: "$bolder",
});


const TaskImage = styled("img", {
  width: "64px",
});

export default AllRoutines;
