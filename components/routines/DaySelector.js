import * as Toggle from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";

const DaySelector = ({ updateValue }) => {
  const days = [
    {
      name: "Segunda",
      value: "monday",
      id: 1,
    },
    {
      name: "Terça",
      value: "tuesday",
      id: 2,
    },
    {
      name: "Quarta",
      value: "wednesday",
      id: 3,
    },
    {
      name: "Quinta",
      value: "thursday",
      id: 4,
    },
    {
      name: "Sexta",
      value: "friday",
      id: 5,
    },
    {
      name: "Sábado",
      value: "saturday",
      id: 6,
    },
    {
      name: "Domingo",
      value: "sunday",
      id: 0,
    },
  ];

  return (
    <div>
      {days.map((day) => (
        <ToggleRoot
          key={day.value}
          onClick={() => {
            updateValue("weekdays", day.id);
          }}
        >
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
  "&:hover": { color: "$black" },
  "&[data-state=on]": { color: "$black", backgroundColor: "$purple" },
  "&:focus-visible": { border: "2px solid $links" },
});

export default DaySelector;
