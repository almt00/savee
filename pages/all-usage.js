import Layout from "../components/elements/Layout";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser, getUser } from "../store/UserSlice";
import { useEffect } from "react";
import { setPage } from "../store/PageSlice";

const AllUsage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  dispatch(setPage("usage"));
  const userId = 1;
  let UseHisto = "";
  let obj = "";
  let taskName = "";
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
    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(userId)); // fazer o fetch com redux caso ainda n esteja o estado (ex.: reloads de pagina)
    }
  }, [dispatch, userData.status]);

  if (userData.status === 200) {
    obj = userData.user.hist_use;
    UseHisto = obj.map((use, index) => {
      taskName = use.name;
      taskInit = new Date(use.start_date);
      taskEnd = new Date(use.end_date);
      taskDuration = new Date(taskEnd - taskInit);
      date = use.start_date;
      const options = { month: "short", day: "numeric" };
      cleanToday = new Date(today).toLocaleDateString("pt-PT", options);
      cleanDate = new Date(date).toLocaleDateString("pt-PT", options);
      cleantaskDuration = Math.floor(taskDuration / 1000 / 60);
      if (
        today.getFullYear() === taskInit.getFullYear() &&
        today.getMonth() === taskInit.getMonth() &&
        today.getDate() === taskInit.getDate()
      ) {
        todaySum += cleantaskDuration;
      }
      return (
        <>
          <Card type="stroke" key={index}>
            <CardItem className="flex justify-between items-center" key={index}>
              <UsageInfo key={index}>
                <h4>{cleantaskDuration} min</h4>
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
    <Layout title="Histórico de uso" description="Histórico de uso">

      <Background color="orange" size="small" />
      <Header page="Histórico uso" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Card>
          <ThisMonth>{todaySum} min</ThisMonth>
          <p className="mt-2">Hoje</p>
        </Card>
        <h3 className="mt-6">Histórico de uso</h3>
        <div className="flex flex-col-reverse gap-3">{UseHisto}</div>
      </div>
    </Layout>
  );
};

const ThisMonth = styled("div", {
  color: "$black",
  fontSize: "$f0",
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
