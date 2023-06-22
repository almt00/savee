import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect } from "react";
import {
  fetchAsyncPaymentGroupDetailsSlice,
  getPaymentGroupDetails,
} from "../../store/PaymentGroupDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Cookies from "js-cookie";

const DoughnutChart = (props) => {
  const dispatch = useDispatch();
  const paymentGroupDetails = useSelector(getPaymentGroupDetails);
  const userId = Cookies.get("userId");

  /*  useEffect(() => {
    if (paymentGroupDetails.status !== 200) {
      dispatch(fetchAsyncPaymentGroupDetailsSlice({ houseid, paymentid }));
    }
  }, [dispatch]); */

  if (paymentGroupDetails.status === 200) {
    let obj = paymentGroupDetails.paymentGroupDetails;
    let totalValue = obj.value_payment;

    // map objGroup and return all colleagues
    let objGroup = paymentGroupDetails.paymentGroupDetails.UserPayment;
    const PaymentGroup = objGroup.map((user) => {
      let percentage = user.payment_percentage * 100;
      let userid = user.user_id;
      let name = user.user.first_name;

      return { percentage, name, userid };
    });

    // for each user, save percentage and name in an array
    let percentageArray = [];
    let nameArray = [];
    let idArray = [];
    PaymentGroup.forEach((user) => {
      percentageArray.push(user.percentage);
      nameArray.push(user.name);
      idArray.push(user.userid);
    });

    // get our user value
    let UserValue = PaymentGroup.find(
      (user) => user.userid === userId
    ).percentage;
    let ourUserValue = (totalValue * UserValue) / 100;

    let border = "";
    let background = "";
    let cutoutPercentage = "";
    if (props.environment === "payment") {
      // create an array with the same length as the percentage array
      let colorArray = new Array(percentageArray.length).fill("#FFFFFF");
      // change the color of the user
      colorArray[idArray.indexOf(userId)] = "#C5E1F2";
      background = colorArray;
      border = "#081B33";
      cutoutPercentage = 80;
    } else {
      background = ["#B0B0B050", "#B0B0B050", "#081B33"];
      border = "#FFFFFF";
      cutoutPercentage = 30;
    }

    const data = {
      labels: nameArray,
      datasets: [
        {
          data: percentageArray,
          backgroundColor: background,
          borderColor: border,
          borderWidth: 1.5,
        },
      ],
    };

    const options = {
      cutout: cutoutPercentage,
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: true,
          color: "white",
          backgroundColor: "grey",
          borderRadius: "100",
        },
      },
    };

    const plugins = [
      {
        afterRender: function (chart) {
          let width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
          ctx.restore();
          let fontSize = (height / 120).toFixed(2);
          ctx.font = fontSize + "em Verdana, sans-serif";
          ctx.textBaseline = "middle";
          let text = `${ourUserValue.toFixed(0)} €`,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ];
    return (
      <>
        <Doughnut
          alt="grafico"
          data={data}
          options={options} /* plugins={plugins} */
        />
        <h1
          className="absolute font-bold text-3xl"
          style={{ left: "42%", top: "310px" }}
        >
          {ourUserValue.toFixed(0)} €
        </h1>
      </>
    );
  }
};
export default DoughnutChart;
