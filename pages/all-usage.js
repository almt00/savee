import Head from "next/head";
import { Inter } from "@next/font/google";
import { styled } from "../stitches.config";
import Card from "../components/elements/Card";
import Header from "../components/elements/Header";
import Background from "../components/elements/Background";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => JSON.parse(res));

const inter = Inter({ subsets: ["latin"] });

const AllUsage = () => {
  //Set up SWR to run the fetcher function when calling api
  const { data, error } = useSWR("/api/user_1", fetcher);

  let obj = "";
  let taskName = "";
  let taskInit = "";
  let taskEnd = "";
  let taskDuration = "";
  let date = "";
  let cleanDate = "";
  let cleantaskDuration = "";
  let today = new Date();
  let cleanToday = "";
  let todaySum = "";

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  console.log("success", data);

  obj = data.user.hist_use;
  console.log(obj);
  const UseHisto = obj.map((use, index) => {
    taskName = use.name;
    taskInit = new Date(use.start_date);
    taskEnd = new Date(use.end_date);
    taskDuration = new Date(taskEnd - taskInit);
    date = use.time;
    const options = { month: "short", day: "numeric" };
    cleanToday = new Date(today).toLocaleDateString("pt-PT", options);
    cleanDate = new Date(date).toLocaleDateString("pt-PT", options);

    cleantaskDuration = Math.floor(taskDuration / 1000 / 60);

    if (
      today.getFullYear() === taskInit.getFullYear() &&
      today.getMonth() === taskInit.getMonth() &&
      today.getDate() === taskInit.getDate()
    ) {
      todaySum += cleantaskDuration;
    }

    console.log(today);
    return (
      <>
        <Card type="stroke">
          <CardItem className="flex justify-between items-center">
            <UsageInfo key={index}>
              <h4>{cleantaskDuration} min</h4>
              <p> {taskName}</p>
            </UsageInfo>
            <p className="text-muted">{cleanDate}</p>
          </CardItem>
        </Card>
      </>
    );
  });
  return (
    <>
      <Head>
        <title>Savee</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background color="orange" size="small" />
      <Header page="Histórico uso" />
      <div className="relative pt-20 px-6 flex flex-col gap-3 pb-6">
        <Card>
          <ThisMonth>{todaySum}</ThisMonth>
          <p className="mt-2">Hoje</p>
        </Card>

        <h3 className="mt-6">Histórico de uso</h3>

        {UseHisto}
      </div>
    </>
  );
};

const ThisMonth = styled("div", {
  color: "$black",
  fontSize: "$f0",
  fontWeight: "$bolder",
  lineHeight: "3rem",
  flex: "1",
});
const UsageInfo = styled("div", {
  p: {
    fontSize: "$small",
  },
});

const CardItem = styled("div", {
  p: {
    fontSize: "$small",
  },
});
export default AllUsage;
