import Cookies from "js-cookie";

export default async function handleRoutines() {
  const endpointUsers = `https://savee-api.vercel.app/user`;
  const currentDate = new Date();

  // GET all user_ids from endpointUsers and store in array
  const responseUsers = await fetch(endpointUsers);
  const resultUsers = await responseUsers.json();
  const users = resultUsers.data.map((user) => user.user_id);

  // for each user_id in the array, GET the routine from endpointRoutines where user_id = user_id
  const routines = [];
  for (let user_id of users) {
    const endpointRoutines = `https://savee-api.vercel.app/user/${user_id}/routine`;
    const responseRoutines = await fetch(endpointRoutines);
    const resultRoutines = await responseRoutines.json();
    const routine = resultRoutines.data;
    routines.push(routine);
  }

  // for each routine, see if there's a routine that matches the current day of the week and time of day
  const currentRoutine = routines.filter((routine) => {
    const routineDay = routine.weekdays.includes(currentDate.getDay());
    const routineTime = routine.period_time === currentDate.getHours();
    return routineDay && routineTime;
  });

  // if there's a routine that matches, POST a new consumption to the endpointConsumption
  if (currentRoutine.length > 0) {
    const endpointConsumption = `https://savee-api.vercel.app/consumption/user/${currentRoutine[0].user_id}`;
    const data = {
      routine_id: currentRoutine[0].routine_id,
      date: currentDate,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
      body: JSONdata,
    };
    const responseConsumption = await fetch(endpointConsumption, options);
    const resultConsumption = await responseConsumption.json();
  }
}
