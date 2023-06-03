import * as Toggle from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";
import Image from "next/image";

const TimePeriodSelector = ({ updateValue }) => {
  const periods = [
    {
      name: "Manhã",
      value: "morning",
      img: "/img/morning@2x.png",
    },
    {
      name: "Tarde",
      value: "afternoon",
      img: "/img/afternoon@2x.png",
    },
    {
      name: "Noite",
      value: "night",
      img: "/img/night@2x.png",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center">
      {periods.map((period) => (
        <ToggleRoot
          key={period.value}
          onChange={(e) => {
            updateValue(e);
          }}
          className="mx-2"
        >
          <Image src={period.img} width={84} height={93} alt={period.name} />
          <p className="mt-2" aria-hidden="true">
            {period.name}
          </p>
        </ToggleRoot>
      ))}
    </div>
  );
};

const ToggleRoot = styled(Toggle.Root, {
  all: "unset",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  borderRadius: 12,
  img: { filter: "saturate(0%)" },
  p: { fontSize: "$small", fontWeight: "$bolder", color: "$black" },
  "&:hover": { img: { filter: "saturate(100%)" } },
  "&[data-state=on]": {
    border: "2px solid $purple",
    img: { filter: "saturate(100%)" },
  },
  "&:focus-visible": {
    border: "2px solid $links",
    img: { filter: "saturate(100%)" },
  },
});

export default TimePeriodSelector;
