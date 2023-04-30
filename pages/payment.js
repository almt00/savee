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

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const insights = useSelector(getInsights);
  const tasks = useSelector(getTasks);
  const paymentid = id ? id : null;
  const userid = 1;
  const taskid = "";

  useEffect(() => {
    dispatch(setPage("payment"));

    if (paymentid && insights.status !== 200 && tasks.status !== 200) {
      dispatch(fetchAsyncInsightsSlice({ paymentid, taskid, userid }));
      dispatch(fetchAsyncTasks());
    }
  }, [dispatch, paymentid]);

  // map tasks and save all task_id in array
  let task_list = [];
  if (tasks.status === 200) {
    let obj = tasks.tasks;
    task_list = obj.map((task, key) => {
      return task.id;
    });
  }

  if (paymentid && insights.status === 200 && tasks.status === 200) {
    // for each task_id, map obj and return all consumption in an array
    const Insights = task_list.reduce((acc, task_id) => {
      let obj = insights.insights.consumption;

      //console.log(obj)

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

    //console.log(Insights);

    // map each Insights array and sum all consumption in each array

    const consumptionValues = Object.values(Insights).map((insight) => {
      let sum = 0;
      insight.forEach((consumption) => {
        // check if element is a task or a routine
        if (consumption.task) {
          const start_time_str = consumption.task.start_time;
          const end_time_str = consumption.task.end_time;

          const start_time = new Date(start_time_str);
          const end_time = new Date(end_time_str);

          const time_diff_ms = end_time.getTime() - start_time.getTime();
          const time_diff_seconds = Math.floor(time_diff_ms / 1000);

          let duration = time_diff_seconds;

          sum += duration;
        } else if (consumption.routine) {
          sum += consumption.routine.duration_routine;
        }
      });
      return sum;
    });
    console.log(consumptionValues);

    return (
      <Layout
        title="Página que permite visualizar e confirmar a sua parte da fatura a pagar, valor atribuido ao utilizador em função da sua porcentagem de consumo dentro do grupo. Também apresenta porcentagems dos outros elementos."
        description="Pagamento"
      >
        <Background color="skyblue" />
        <Header page="Pagamento" />
        <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
          <Breadcrumb />
          {id && <PaymentCard id={id} />}

          <H3 className="mt-6">Resumos do mês</H3>
          <Insight taskId={0} type="Aquecimento" value="11,3€" />
          <Insight taskId={2} type="Duche" value="20,4€" />
          <Insight taskId={3} type="Cozinhar" value="13,1€" />
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
