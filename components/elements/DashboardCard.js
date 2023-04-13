import { styled } from "@stitches/react";
import Chart from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { fetchAsyncGroup, getGroup } from "../../store/GroupSlice";
import {
  fetchAsyncGroupDetails,
  getgroupDetails,
} from "../../store/GroupDetailsSlice";
import { useEffect } from "react";
import Card from "./Card";

const DashboardCard = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const tasksData = useSelector(getTasks);
  const groupData = useSelector(getGroup);
  const groupId = 1; // ver grupo do user
  const userId = 1;
  let sumConsumption = 0;
  let lastMonthCons = 0;
  let consDif = 0;
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1); // data de há um mes atras, ver data fatura
  let members;
  let dayDif;

  useEffect(() => {
    if (groupData.status !== 200) {
      dispatch(fetchAsyncGroup(groupId)); // fazer o fetch com redux do grupo
      /* .then((res) => {
          members = res.payload.group.members;
          members.forEach((element) => {
            dispatch(fetchAsyncGroupDetails(element)); // fazer o fetch com redux do grupo
          });
        }); */
      //dispatch(fetchAsyncGroupDetails(1)); // fazer o fetch com redux do grupo
    }

    if (userData.status !== 200) {
      dispatch(fetchAsyncUser(userId)); // fazer o fetch com redux
    }
    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux~
    }
  }, [dispatch, groupData.status, tasksData.status, userData.status]);

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
  }

  if (groupData.status === 200) {
    let invoice = groupData.group.invoice_date; //Guarda o dia do invoice do grupo
    const groupFullDate = new Date(invoice);
    let payDate = new Date(
      groupFullDate.setMonth(groupFullDate.getMonth() + 1)
    );
    let today = new Date();
    dayDif = new Date(payDate - today).getDate();
  }
  let kwTotalGroup = 3210;
  let kwTotalUser = Math.round(sumConsumption);
  let numberDays = dayDif;
  let percentage = consDif.toString().replace(/-/g, "");

  return (
    <Card>
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
      {dayDif != 0 ? (
        <Stats className="mb-2">
          <span className="font-bold">{numberDays} dias </span>até ao próximo
          pagamento
        </Stats>
      ) : (
        <Stats className="mb-2">
          <span className="font-bold text-danger">{numberDays} dias </span>até
          ao próximo pagamento
        </Stats>
      )}

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
    </Card>
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
