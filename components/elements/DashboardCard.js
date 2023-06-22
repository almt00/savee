import { styled } from "@stitches/react";
import Chart from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTasks, getTasks } from "../../store/TasksSlice";
import { fetchAsyncGroup, getGroup } from "../../store/GroupSlice";
import {
  fetchAsyncGroupDetails,
  getGroupDetails,
} from "../../store/GroupDetailsSlice";

import {
  fetchAsyncConsumption,
  getConsumption,
} from "../../store/ConsumptionSlice";
import { useEffect } from "react";
import Card from "./Card";
import Cookies from "js-cookie";
import { getUser } from "../../store/UserSlice";
import {
  fetchAsyncPaymentGroupDetailsSlice,
  getPaymentGroupDetails,
} from "../../store/PaymentGroupDetailsSlice";
import {
  fetchAsyncPaymentGroupSlice,
  getPaymentGroup,
} from "../../store/PaymentGroupSlice";

const DashboardCard = () => {
  const dispatch = useDispatch();
  const tasksData = useSelector(getTasks);
  const groupData = useSelector(getGroup);
  const groupPayment = useSelector(getPaymentGroup);
  const groupDetailsData = useSelector(getGroupDetails);
  const consumptionData = useSelector(getConsumption);
  const houseId = Cookies.get("houseId");
  const userId = Cookies.get("userId");
  let taskId;
  let startTime;
  let endTime;
  let duration;
  let sumConsumption = 0;
  let lastMonthCons = 0;
  let consDif = 0;
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1); // data de há um mes atras, ver data fatura
  let members;
  let dayDif;
  let sumConsumptionGroup = 0;

  useEffect(() => {
    if (groupPayment.status !== 200) {
      dispatch(fetchAsyncPaymentGroupSlice(houseId)); // fazer o fetch com redux do grupo
    }
    if (groupDetailsData.status !== 200) {
      dispatch(fetchAsyncGroupDetails(houseId)); // fazer o fetch com redux do grupo
    }

    if (tasksData.status !== 200) {
      dispatch(fetchAsyncTasks()); // fazer o fetch com redux~
    }

    if (consumptionData.status !== 200) {
      dispatch(fetchAsyncConsumption(userId)); // fazer o fetch com redux~
    }
  }, [dispatch]);

  if (consumptionData.status === 200 && tasksData.status === 200) {
    let userConsumeHist = consumptionData.consumption;
    userConsumeHist.forEach((element) => {
      if (element.type === 1) {
        taskId = element.task.task;
        startTime = new Date(element.task?.start_time);
        endTime = new Date(element.task?.end_time);
        duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
      } else if (element.type === 0) {
        taskId = element.task_routine;
        startTime = new Date(element.consumption_date);
        /*  let endTime = new Date(element.task?.end_time); */
        duration = element.consumption / 60 / 60;
      }
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

  if (
    consumptionData.status === 200 &&
    tasksData.status === 200 &&
    groupDetailsData.status === 200
  ) {
    let groupConsumeHist = groupDetailsData.groupDetails;
    groupConsumeHist.forEach((element) => {
      if (element.type === 1) {
        taskId = element.task.task;
        startTime = new Date(element.task?.start_time);
        endTime = new Date(element.task?.end_time);
        duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
      } else if (element.type === 0) {
        taskId = element.task_routine;
        startTime = new Date(element.consumption_date);
        /*  let endTime = new Date(element.task?.end_time); */
        duration = element.consumption / 60 / 60;
      }
      let chosenTask = tasksData.tasks.find((task) => task.id === taskId);
      let consumption = chosenTask.kw_hour * duration;
      if (startTime >= lastMonth) {
        sumConsumptionGroup += consumption;
      }
    });
  }

  if (groupPayment.status === 200) {
    let payment_date = groupPayment.paymentGroup[0].date_payment; //Guarda o dia do invoice do grupo
    const groupFullDate = new Date(payment_date);
    let payDate = new Date(
      groupFullDate.setMonth(groupFullDate.getMonth() + 1)
    ); //adicionar msg caso o mes n seja o certo aka pagamento em atraso
    let today = new Date();
    dayDif = new Date(payDate - today).getDate();
  }
  let kwTotalGroup = Math.round(sumConsumptionGroup);
  let kwTotalUser = Math.round(sumConsumption);
  let numberDays = dayDif;
  let percentage = consDif.toString().replace(/-/g, "");

  return (
    <Card>
      <Container>
        <NumberKw>
          <H3>
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
          </H3>
          <SubTitle>
            de <span className="font-bold">{kwTotalGroup} kW </span>consumidos
            este mês
          </SubTitle>
        </NumberKw>
        <div className="w-24">
          {/*
          <Chart></Chart>
          */}
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
  fontSize: "$normal",
});

const SubTitle = styled("p", {
  color: "$black",
  fontSize: "$small",
  fontWeight: "normal",
});

const NumberKw = styled("div", {
  color: "$black",
  fontSize: "$xlargeheading",
  fontWeight: "$bolder",
  lineHeight: "3rem",
  flex: "1",
});

const H3 = styled("h3", {
  fontSize: "$xlargeheading",
  fontWeight: "$bolder",
});

const TrendIcon = styled("img", {
  display: "inline",
});

export default DashboardCard;
