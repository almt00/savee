import Layout from "../components/elements/Layout";
import Card from "../components/elements/Card";
import Button from "../components/elements/Button";
import Header from "../components/elements/Header";
import Breadcrumb from "../components/elements/Breadcrumb";
import Background from "../components/elements/Background";
import TaskList from "../components/routines/TaskList";
import DaySelector from "../components/routines/DaySelector";
import TimePeriodSelector from "../components/routines/TimePeriodSelector";
import TimeSelector from "../components/routines/TimeSelector";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/PageSlice";

export default function Routine() {
  const dispatch = useDispatch();
  dispatch(setPage("routines"));
  // state to keep track of the current step
  const [step, setStep] = useState(0);

  // Grouping forms by section in a component
  const TaskFields = () => (
    <>
      <p className="black ml-6">Escolhe a tarefa para criares uma rotina:</p>
      <TaskList
        onClickEvent={() => {
          setStep(step + 1);
        }}
      />
    </>
  );

  const DayFields = () => (
    <>
      <p className="black">Escolhe os dias da semana</p>
      <DaySelector />
    </>
  );

  const PeriodFields = () => (
    <>
      <p className="black">Escolhe a altura do dia</p>
      <TimePeriodSelector />
    </>
  );

  const TimeFields = () => <TimeSelector />;

  // array of components to be rendered
  const fieldGroups = [
    <TaskFields key={""} />,
    <DayFields key={""} />,
    <PeriodFields key={""} />,
    <TimeFields key={""} />,
  ];

  // logic to navigate between steps
  const Navigation = () => (
    <>
      <div className="flex justify-center">
        {step === fieldGroups.length - 1 && (
          <>
            <Button
              className="mt-6 mr-4"
              bg="transparent"
              size="lg"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              Anterior
            </Button>
            <Link href="/homepage">
              <Button className="mt-6" bg="solid" size="lg">
                Feito
              </Button>
            </Link>
          </>
        )}
        {step < fieldGroups.length - 1 &&
          step > 0 && ( // mudar este condicional depois de termos os estados a funcionar
            <>
              {step < fieldGroups.length - 1 &&
                step > 0 && ( // tirar este condicional depois de termos os estados a funcionar
                  <Button
                    className="mt-6 mr-4"
                    bg="transparent"
                    size="lg"
                    onClick={() => {
                      if (step > 0) {
                        setStep(step - 1);
                      }
                    }}
                  >
                    Anterior
                  </Button>
                )}

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
    <Layout title="Página para criar novas rotinas com tarefas para que ser repetidas de forma automática" description="Criar rotina">
      <Background color="purple" />
      <Header page="Rotinas" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Breadcrumb />
        <Card>
          {fieldGroups[step]}
          <Navigation />
        </Card>
      </div>
    </Layout>
  );
}
