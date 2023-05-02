import { styled, keyframes } from "@stitches/react";
import { useEffect, useState } from "react";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Entries from "./Entries";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncConsumptionToday,
  getConsumptionToday,
} from "../../store/ConsumptionTodaySlice";

const RoutinesList = () => {
  const id = 1;
  const dispatch = useDispatch();
  const consumptionTodayData = useSelector(getConsumptionToday);

  useEffect(() => {
    if (consumptionTodayData.status !== 200) {
      dispatch(fetchAsyncConsumptionToday(id)); // fazer o fetch com redux
    }
  }, [dispatch]);

  return (
    <AccordionRoot type="single" defaultValue="item-1" collapsible>
      <AccordionItem
        value="item-1"
        className="border-border border-2 rounded-md mb-4 "
      >
        <AccordionTrigger className="font-extrabold text-sm ml-0 h-9">
          Manhã
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {" "}
            <Entries time="morning" />
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className="border-border border-2 rounded-md mt-4 "
      >
        <AccordionTrigger className="font-extrabold text-sm ml-0 h-9">
          Tarde
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            <Entries time="afternoon" />
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-3"
        className="border-border border-2 rounded-md mt-4 "
      >
        <AccordionTrigger className="font-extrabold text-sm ml-0 h-9">
          Noite
        </AccordionTrigger>
        <Accordion.Content>
          <ul>
            <Entries time="night" />
          </ul>
        </Accordion.Content>
      </AccordionItem>
    </AccordionRoot>
  );
};

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionHeader>
      <Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="AccordionChevron w-5 h-5 transition-transform duration-300"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Trigger>
    </AccordionHeader>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div>{children}</div>
    </Content>
  )
);
AccordionContent.displayName = "AccordionContent";

const AccordionRoot = styled(Accordion.Root, {
  width: "100%",
  borderradius: "7px",
  display: "inline",
});
const AccordionItem = styled(Accordion.Item, {
  padding: "0.5rem",
  marginBottom: "0.25rem",
  flexdirection: "column",
  overflow: "hidden",
  margintop: ".0625rem",
});
const AccordionHeader = styled(Accordion.Header, {
  display: "flex",
  justifycontent: "flex-end",
});
const Trigger = styled(Accordion.Trigger, {
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",
  "&[data-state='open']  > .AccordionChevron": {
    transform: "rotate(180deg)",
  },
});

const slideDown = keyframes({
  from: { height: "0" },
  to: { height: "var(--radix-accordion-content-height)" },
});
const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: "0" },
});
const Content = styled(Accordion.Content, {
  overflow: "hidden",
  "&[data-state='open']": {
    animation: `${slideDown} 300ms`,
  },
  "&[data-state='closed']": {
    animation: `${slideUp} 300ms`,
  },
});

export default RoutinesList;
