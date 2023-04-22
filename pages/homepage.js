import { styled } from "@stitches/react";
import Layout from '../components/elements/Layout';
import Header from '../components/elements/Header';
import Background from '../components/elements/Background';
import Banner from '../components/elements/Banner';
import DashboardCard from '../components/elements/DashboardCard';
import Tasks from '../components/dashboard/Tasks';
import RoutinesList from '../components/dashboard/RoutinesList';
import DisplayName from '../components/dashboard/DisplayName';
import Toaster from '../components/elements/Toaster';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { setPage } from "../store/PageSlice";

export default function Homepage() {
  const dispatch = useDispatch();
  dispatch(setPage("homepage"));
  const router = useRouter();
  const query = router.query; // ir buscar query string ao URL
  const toastStatus = query.toast; // capturar toast status


  const date = new Date().toLocaleDateString('pt-PT', {
    month: 'long',
    day: 'numeric',
  });
  const toDay = Number(date.split(" ")[0]);

  const H5 = styled("h5", {
    fontSize: "$mediumheading",
    fontWeight: "$bolder",
  });


  return (
    <Layout title="Página principal da plataforma onde podes ver os consumos mensais e realizar tarefas para poupares a tua carteira o ambiente" description="Homepage for Savee">
      <Background color="mint" />
      <Header page="Homepage" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <DisplayName />
        <Banner toDay={toDay}/>
        <DashboardCard />
        <Tasks />
        <div>
          <div className="flex justify-between items-center">
            <H5>Hoje</H5>
            <p className="text-muted">{date}</p>
          </div>
        </div>
        <RoutinesList />
        {toastStatus === 'success' ? <Toaster className = 'show' /> : ''}
      </div>
    </Layout>
  );
}
