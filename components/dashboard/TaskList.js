import { styled, keyframes } from "@stitches/react";
import { useState } from "react";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Entries from "./Entries";

const TaskList = (props) => (
  <AccordionRoot type="single" defaultValue="item-1" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger className="font-extrabold text-sm ml-0">
        Manhã
      </AccordionTrigger>
      <AccordionContent>
        <Entries />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger className="font-extrabold text-sm ml-0">
        Tarde
      </AccordionTrigger>
      <AccordionContent>
        <Entries />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger className="font-extrabold text-sm ml-0">
        Noite
      </AccordionTrigger>
      <Accordion.Content>
        <Entries />
      </Accordion.Content>
    </AccordionItem>
  </AccordionRoot>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionHeader>
      <Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <AccordionChevron className="AccordionChevron" aria-hidden />
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
  padding: "10px",
  width: "342px",
  borderradius: "7px",
  padding: "5px 16px 5px 16px",
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
  "&[data-state='open']  > .AccordionChevron": {
    transform: "rotate(180deg)",
  },
});
const AccordionChevron = styled(ChevronDownIcon, {
  transition: "transform 300ms",
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

export default TaskList;
