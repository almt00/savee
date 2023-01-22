import Banner from "../components/elements/Banner"
import React from "react";
import { fetchAsyncGroup, getGroup } from "../store/GroupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function Teste() {
    const id = 1;//Id para identificar o grupo a ir buscar dados
    let invoice = "";

    const fullDate = new Date();//Buscar data atual
    const todayDate = `${fullDate.getDate()}`;//recolhe só o dia de hoje dentro da 
    console.log(fullDate)
    console.log(todayDate)
    const dispatch = useDispatch();
    const groupData = useSelector(getGroup);

    useEffect(() => {
        dispatch(fetchAsyncGroup(id)); // fazer o fetch com redux
    }, [dispatch]);

    if (groupData.status === 200) {
        invoice = groupData.group.invoice_date;
        console.log(invoice)

        const groupFullDate = new Date(invoice);
        const payDate = groupFullDate.getDate().toString();
        console.log(payDate);
        if (invoice === payDate) {
            return (
                <div>
                    <Banner />
                </div>
            )
        }
    }
}