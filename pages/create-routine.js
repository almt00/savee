import Layout from "../components/elements/Layout";
import withAuth from "../components/withAuth";
import Card from "../components/elements/Card";
import Button from "../components/elements/Button";
import Header from "../components/elements/Header";
import Breadcrumb from "../components/elements/Breadcrumb";
import Background from "../components/elements/Background";
import TaskList from "../components/routines/TaskList";
import DaySelector from "../components/routines/DaySelector";
import TimePeriodSelector from "../components/routines/TimePeriodSelector";
import TimeSelector from "../components/routines/TimeSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/PageSlice";
import router from "next/router";
import { fetchAsyncUser } from "../store/UserSlice";
import Cookies from "js-cookie";

function Routine() {
  const dispatch = useDispatch();
  // state to keep track of the current step
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const id = Cookies.get("userId"); // Get the id value
  useEffect(() => {
    dispatch(setPage("routines"));
  }, []);

  const handleSubmit = async () => {
    const data = {
      task: userData.task,
      weekdays: userData.weekdays,
      period_time: userData.period_time,
      duration_routine: userData.duration_routine, // em segundos
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `https://savee-api.vercel.app/user/${id}/routine`; // Concatenate the id into the endpoint

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    if (result.success) {
      dispatch(fetchAsyncUser(id)); // não sei se precisamos disto
      router.push("/all-routines");
    }
  };

  const updateValue = (name, value) => {
    const currentValue = userData[name];

    if (name === "weekdays" || name === "period_time") {
      let found = currentValue?.includes(value);

      if (found) {
        let foundIndex = currentValue.indexOf(value);
        const updatedValue = currentValue.toSpliced(foundIndex, 1);
        setUserData({ ...userData, [name]: updatedValue });
      }

      // Create an array if the current value exists and it's not already an array
      else if (currentValue && !Array.isArray(currentValue)) {
        const updatedValue = [currentValue, value];
        setUserData({ ...userData, [name]: updatedValue });
      }

      // Append the new value to the existing array
      else if (Array.isArray(currentValue)) {
        const updatedValue = [...currentValue, value];
        setUserData({ ...userData, [name]: updatedValue });
      } else {
        setUserData({ ...userData, [name]: [value] });
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Grouping forms by section in a component
  const taskFields = () => (
    <>
      <p className="black ml-6">Escolhe a tarefa para criares uma rotina:</p>
      <TaskList
        id="tarefa"
        onClickEvent={() => {
          setStep(step + 1);
        }}
        updateValue={updateValue} // Pass the updateValue function as a prop
      />
    </>
  );

  const dayFields = () => (
    <>
      <p className="black">Escolhe os dias da semana</p>
      <DaySelector id="dias" updateValue={updateValue} />
    </>
  );

  const periodFields = () => (
    <>
      <p className="black">Escolhe a altura do dia</p>
      <TimePeriodSelector id="periodo" updateValue={updateValue} />
    </>
  );

  const timeFields = () => (
    <TimeSelector id="duracao" updateValue={updateValue} />
  );

  // array of components to be rendered
  const fieldGroups = [taskFields(), dayFields(), periodFields(), timeFields()];

  // logic to navigate between steps
  const navigation = () => (
    <>
      {fieldGroups[step]}
      <div className="flex justify-center">
        {step === fieldGroups.length - 1 && (
          <>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-6"
              bg="solid"
              size="lg"
            >
              Feito
            </Button>
          </>
        )}
        {step < fieldGroups.length - 1 &&
          step > 0 && ( // mudar este condicional depois de termos os estados a funcionar
            <>
              <Button
                className="mt-6"
                bg="solid"
                size="lg"
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                Próximo
              </Button>
            </>
          )}
      </div>
    </>
  );

  return (
    <Layout
      description="Página para criar novas rotinas com tarefas que virão a ser repetidas de forma automática nos dias e horas seleccionados."
      title="Criar rotina"
    >
      <Background color="purple" />
      <Header page="Rotinas" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Breadcrumb />
        <Card>{navigation()}</Card>
      </div>
    </Layout>
  );
}

export default withAuth(Routine);
