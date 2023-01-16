import * as Toggle from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";

const Selector = () => {
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
        <Toggle.Root key={day.value}>
          {day.name}
        </Toggle.Root>
      ))}
    </div>
  );
};

const ToggleRoot = styled(Toggle.Root, {
  all: "unset",
  backgroundColor: "white",
  color: "$black",
  height: 35,
  width: 35,
  borderRadius: 4,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
});

export default Selector;
