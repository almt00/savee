import { React, useState } from "react";
import Layout from "../components/elements/Layout";
import Background from "../components/elements/Background";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Task from "../components/elements/Task";
import Timer from "../components/Timer";
import Breadcrumb from "../components/elements/Breadcrumb";

export default function task() {
  return (
    <Layout description="Página para registar tarefas individuais que não fazem parte das rotinas" title="Tarefa">
      <Background color="yellow" />
      <Header page="Tarefa" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Breadcrumb/>
        <Card classes="flex flex-col justify-center items-center">
          <Task size="lg"></Task>
          <Timer />
        </Card>
      </div>
    </Layout>
  );
}
