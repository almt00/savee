import * as Toggle from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";

const DaySelector = () => {
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

  return (
    <div>
      {days.map((day) => (
        <ToggleRoot key={day.value}>{day.name}</ToggleRoot>
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
  '&:hover': { color: "$black", boxShadow: "$card" },
  "&[data-state=on]": { color: "$black", backgroundColor: "$purple" },
  '&:focus-visible': { border: "2px solid $links", },
});

export default DaySelector;
