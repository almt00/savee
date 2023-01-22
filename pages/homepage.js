import Layout from "../components/elements/Layout";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import Banner from "../components/elements/Banner";
import DashboardCard from "../components/elements/DashboardCard";
import Tasks from "../components/dashboard/Tasks";
import RoutinesList from "../components/dashboard/RoutinesList";
import DisplayName from "../components/dashboard/DisplayName";
import { useDispatch } from "react-redux";
import { setPage } from "../store/PageSlice";

export default function Homepage() {
  const dispatch = useDispatch();
  dispatch(setPage("homepage"));

  const date = new Date().toLocaleDateString("pt-PT", {
    month: "long",
    day: "numeric",
  });
  return (
    <Layout title="Dashboard" description="Homepage for Savee">
      <Background color="mint" />
      <Header page="Homepage" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <DisplayName />
        <Banner />
        <DashboardCard />
        <Tasks />
        <div>
          <div className="flex justify-between items-center">
            <h3>Hoje</h3>
            <p className="text-muted">{date}</p>
          </div>
        </div>
        <RoutinesList />
      </div>
    </Layout>
  );
}
