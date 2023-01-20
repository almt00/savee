import { styled } from "@stitches/react";
import Chart from "./Chart";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { useEffect } from "react";

//criar switch ou else if :
//com tendência a subir em comparação com último mÊs _ seta up,
//tendencia a descer  _seta down,
//igual ao do mês passado ou empty state sem seta

const DashboardCard = () => {
  const userData = useSelector(getUser);
  const tasksData = useSelector(getTasks);
  let sumConsumption = 0;
  let lastMonthCons = 0;
  let consDif = 0;
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1); // data de há um mes atras, ver data fatura

  /* useEffect(() => {
    if (userData === null || userData === undefined || userData === "") {
      dispatch(fetchAsyncUser(id)); // fazer o fetch com redux
    }
    if (tasksData === null || tasksData === undefined || tasksData === "") {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux~
    }
  }, []); */

  if (userData.status === 200 && tasksData.status === 200) {
    let userConsumeHist = userData.user.hist_use;
    userConsumeHist.forEach((element) => {
      let taskId = element.task_id;
      let startTime = new Date(element.start_date);
      let endTime = new Date(element.end_date);
      let duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
      let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
      let consumption = chosenTask.kw_hour * duration;
      if (startTime >= lastMonth) {
        sumConsumption += consumption;
      } else {
        lastMonthCons += consumption;
      }
    });
    consDif = (Math.round(lastMonthCons - sumConsumption) / 100).toFixed(1);
    console.log("cons dif ", consDif);
  }

  let kwTotalGroup = 22;
  let kwTotalUser = Math.round(sumConsumption);
  let numberDays = 22;
  let percentage = consDif.toString().replace(/-/g, "");

  return (
    <div>
      <Container>
        <NumberKw>
          {kwTotalUser} kW
          {consDif >= 0 ? (
            <TrendIcon
              src="/img/tendencia_down.svg"
              className="ml-4"
              alt="Pagamentos"
            />
          ) : (
            <TrendIcon
              src="/img/tendencia_up.svg"
              className="ml-4"
              alt="Pagamentos"
            />
          )}
          <SubTitle>
            de <span className="font-bold">{kwTotalGroup} kW </span>consumidos
            este mês
          </SubTitle>
        </NumberKw>
        <div className="w-24">
          <Chart></Chart>
        </div>
      </Container>
      <Stats className="mb-2">
        <span className="font-bold">{numberDays} dias </span>até ao próximo
        pagamento
      </Stats>
      {consDif >= 0 ? (
        <Stats>
          <span className="font-bold">{percentage}% </span>melhor que o mês
          passado
        </Stats>
      ) : (
        <Stats>
          <span className="font-bold">{percentage}% </span>pior que o mês
          passado
        </Stats>
      )}
    </div>
  );
};

const Container = styled("div", {
  display: "flex",
});

const Stats = styled("p", {
  color: "$black",
});

const SubTitle = styled("p", {
  color: "$black",
  fontSize: "$small",
});

const NumberKw = styled("div", {
  color: "$black",
  fontSize: "$h1",
  fontWeight: "$bolder",
  lineHeight: "3rem",
  flex: "1",
});

const TrendIcon = styled("img", {
  display: "inline",
});

export default DashboardCard;
