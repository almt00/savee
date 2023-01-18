import { styled } from "@stitches/react";
import { useState } from "react";
import Entries from "./Entries";
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
//import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';


const TasksList = () => {

const [dayMoment, setDayMoment] = useState("morning");

const morning =()=>{
    setDayMoment("morning");
}
const noon =()=>{
    setDayMoment("noon");
}
const afternoon =()=>{
    setDayMoment("afternoon");
}
 
    //Root box display 3 item boxes, one for each part of the day, morning, noon, afternoon.
    //To be able to filter the items presented on the list, props must be pass on inside the Entries tag
    <Accordion.Root style={root} type="single" defaultValue="item-1" collapsible>
        <Accordion.Item style={item} value="item-1">
            <Accordion.Header style={header}>
                 <h5>Manhã</h5>
                <Accordion.Trigger style={trigger} onClick={morning}>
                    <ChevronDownIcon style={chevron} aria-hidden />
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
                <Entries props={dayMoment}/>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item  style={item} value="item-2">
            <Accordion.Header style={header}>
                <h5>Tarde</h5>
                <Accordion.Trigger style={trigger}  onClick={noon}>
                    <ChevronDownIcon style={chevron} aria-hidden />
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
                <Entries props={dayMoment}/>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item  style={item} value="item-3">
            <Accordion.Header style={header}>
                <h5>Noite</h5>
                <Accordion.Trigger style={trigger} onClick={afternoon}>
                    <ChevronDownIcon style={chevron} aria-hidden />
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
                <Entries props={dayMoment}/>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
};
const root = {
    padding: "10px",
    width: "342px",
    borderradius: "7px",
    padding: "5px 16px 5px 16px",
    display: "inline"

}
const item = {
  padding: "0.5rem",
  marginBottom: "0.25rem",
  flexdirection: "column",
}
const header = {
    display:"flex",
    justifycontent: "flex-end"

}
const trigger = {
    marginLeft: "auto",
    '&[data-state="open"]': {
        transform: 'rotate 180deg'
      },

}
const chevron = {
    display:"flex",
    justifycontent: "flex-end",
    transition: 'transform 300ms',
    

}

export default TasksList;