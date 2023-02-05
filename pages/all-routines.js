import Layout from "../components/elements/Layout";
import { Inter } from "@next/font/google";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import Link from "next/link";
import Button from "../components/elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser, getUser } from "../store/UserSlice";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";

const AllRoutines = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  dispatch(setPage("routines"));

  const userId = 1;
  let obj = "";
  let Routines = "";
  let type = "";
  let weekdays = "";
  let duration = "";

  useEffect(() => {
    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch]);

  if (userData.status === 200) {
    obj = userData.user.routines;
    Routines = obj?.map((routine, index) => {
      type = routine.task_id;
      weekdays = routine.weekdays;
      duration = routine.duration;

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
                  <h4>{type}</h4>
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
    <Layout title="Rotinas" description="Rotinas">
      <Background color="purple" size="small" />
      <Header page="Rotinas" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Link href="/create-routine">
          <Button bg="solid" size="lg">
            + nova rotina
          </Button>
        </Link>
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

export default AllRoutines;
