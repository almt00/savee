import * as Toggle from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";
import { useState } from "react";

const DaySelector = () => {
  // state to keep track of clicked day
  const [dayName, setDayName] = useState([]);

  const days = [
    {
      name: "Segunda",
      value: "monday",
    },
    {
      name: "Terça",
      value: "tuesday",
    },
    {
      name: "Quarta",
      value: "wednesday",
    },
    {
      name: "Quinta",
      value: "thursday",
    },
    {
      name: "Sexta",
      value: "friday",
    },
    {
      name: "Sábado",
      value: "saturday",
    },
    {
      name: "Domingo",
      value: "sunday",
    },
  ];
  // action to record the clicked day
  const handleDayName = (e) => {
    if (dayName.includes(e.target.value) === false && dayName !== []) {
      setDayName((current) => [...current, e.target.value]);
    } else {
      let array = [...dayName]; // make a separate copy of the array
      let index = array.indexOf(e.target.value);
      console.log(index, array);
      if (index !== -1) {
        array.splice(index, 1);
        setDayName([...array]);
      }
    }
  };

  // debugging state
  console.log(dayName);

  return (
    <div>
      {days.map((day) => (
        <ToggleRoot key={day.value} value={day.value} onClick={handleDayName}>
          {day.name}
        </ToggleRoot>
      ))}
    </div>
  );
};

const ToggleRoot = styled(Toggle.Root, {
  all: "unset",
  backgroundColor: "white",
  color: "$muted",
  border: "1px solid $border",
  height: "2.5rem",
  width: "100%",
  margin: "1rem 0",
  borderRadius: "12px",
  display: "flex",
  fontSize: "$normal",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { color: "$black", boxShadow: "$card" },
  "&[data-state=on]": { color: "$black", backgroundColor: "$purple" },
  "&:focus-visible": { border: "2px solid $links" },
});

export default DaySelector;
