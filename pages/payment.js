import { styled } from "../stitches.config";
import Layout from "../components/elements/Layout";
import Background from "../components/elements/Background";
import PaymentCard from "../components/payment/PaymentCard";
import Header from "../components/elements/Header";
import Breadcrumb from "../components/elements/Breadcrumb";
import Insight from "../components/elements/Insight";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/PageSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchAsyncInsightsSlice, getInsights } from "../store/InsightsSlice";
import { fetchAsyncTasks, getTasks } from "../store/TasksSlice";
import { getPaymentGroupDetails } from "../store/PaymentGroupDetailsSlice";
import { fetchAsyncPaymentGroupDetailsSlice } from "../store/PaymentGroupDetailsSlice";
import Cookies from "js-cookie";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const insights = useSelector(getInsights);
  const tasks = useSelector(getTasks);
  const payment = useSelector(getPaymentGroupDetails);
  const paymentid = id ? id : null;
  const houseId = Cookies.get("houseId");
  const taskid = "";
  let chosenTask = null;
  let totalConsumption = 0;
  let userPercentage = 0;
  let payment_value = 0;

  useEffect(() => {
    dispatch(setPage("payment"));

    if (paymentid && insights.status !== 200 && tasks.status !== 200) {
      dispatch(fetchAsyncInsightsSlice({ paymentid, taskid, userid }));
      dispatch(fetchAsyncTasks());
    }

    if (paymentid && payment.status !== 200) {
      dispatch(
        fetchAsyncPaymentGroupDetailsSlice({ houseid: houseId, paymentid })
      );
    }
  }, [dispatch, paymentid, payment]);

  // map tasks and save all task_id in array
  let task_list = [];
  if (tasks.status === 200) {
    let obj = tasks.tasks;
    task_list = obj.map((task, key) => {
      return task.id;
    });
  }

  if (
    paymentid &&
    insights.status === 200 &&
    tasks.status === 200 &&
    payment.status === 200
  ) {
    userPercentage = insights?.insights.payment.payment_percentage;
    payment_value = userPercentage * payment?.paymentGroupDetails.value_payment;

    // for each task_id, map obj and return all consumption in an array
    const Insights = task_list.reduce((acc, task_id) => {
      let obj = insights.insights.consumption;

      // filter obj by task_id
      let filtered = obj.filter((consumption) => {
        // check whether task or routine exists and return id
        let id = "";
        if (consumption.task) {
          id = consumption.task.task;
        } else if (consumption.routine) {
          id = consumption.routine.task;
        }
        return id === task_id;
      });
      acc[task_id] = filtered;
      return acc;
    }, {});

    insights.insights.consumption.forEach((element) => {
      totalConsumption += element.consumption;
    });

    // map each Insights array and sum all consumption in each array
    const consumptionValues = Object.values(Insights).map((insight) => {
      let sum = 0;
      let percentage = 0;
      let consumptionPrice = 0;
      insight.forEach((consumption) => {
        sum += consumption.consumption;
        percentage = sum / totalConsumption;
        consumptionPrice = percentage * payment_value;
      });
      return consumptionPrice.toFixed(2);
    });

    // return Insight component for each consumptionValue in array
    const insightsComponent = consumptionValues.map((value, key) => {
      // only return if value is greater than 0
      if (value > 0) {
        // match key from consumptionValues array with task_id from task_list array
        const task_id = task_list[key];
        // filter tasks by task_id
        tasks.tasks.filter((task) => {
          if (task.id === task_id) {
            return (chosenTask = task.id);
          }
        });

        return <Insight key={key} taskId={chosenTask} value={value} />;
      }
    });

    return (
      <Layout
        description="Página que permite visualizar e confirmar a sua parte da fatura a pagar, valor atribuido ao utilizador em função da sua porcentagem de consumo dentro do grupo. Também apresenta porcentagems dos outros elementos."
        title="Pagamento"
      >
        <Background color="skyblue" />
        <Header page="Pagamento" />
        <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
          <Breadcrumb />
          {id && <PaymentCard id={id} />}

          <H3 className="mt-6">Resumos do mês</H3>
          {insightsComponent}
        </div>
      </Layout>
    );
  }
};

export default Payment;

const H3 = styled("h3", {
  fontSize: "$mediumheading",
  fontWeight: "$bolder",
});
