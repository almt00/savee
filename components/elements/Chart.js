import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { styled } from "@stitches/react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { fetchAsyncPaymentSlice, getPayment } from "../../store/PaymentSlice";
import {
  fetchAsyncPaymentGroupSlice,
  getPaymentGroup,
} from "../../store/PaymentGroupSlice";
import { fetchAsyncUser, getUser } from "../../store/UserSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DoughnutChart = (props) => {
  const dispatch = useDispatch();
  const paymentData = useSelector(getPayment);
  const paymentGroupData = useSelector(getPaymentGroup);
  const userData = useSelector(getUser);
  const userId = 1;
  const houseId = 1;

  useEffect(() => {
    if (paymentData.status !== 200 && paymentGroupData.status !== 200 && userData.status !== 200) {
      dispatch(fetchAsyncPaymentSlice(userId));
      dispatch(fetchAsyncPaymentGroupSlice(houseId));
      dispatch(fetchAsyncUser(houseId));
    }
  }, [dispatch]);

  if (paymentData.status === 200 && paymentGroupData.status === 200 && userData.status === 200) {
    const latestGroupPayment =
      paymentGroupData.paymentGroup[paymentGroupData.paymentGroup.length - 1];
    const groupValue = latestGroupPayment.value_payment;
    const latestPayment = paymentData.payment[paymentData.payment.length - 1]; // need to change logic to get selected id payment
    const userValue = latestPayment.payment_percentage;

    const finalUserValue = groupValue * userValue;

    let border = "";
    let background = "";
    let cutoutPercentage = "";
    if (props.environment === "payment") {
      background = ["#FFFFFF", "#FFFFFF", "#C5E1F2"];
      border = "#081B33";
      cutoutPercentage = 80;
    } else {
      background = ["#B0B0B050", "#B0B0B050", "#081B33"];
      border = "#FFFFFF";
      cutoutPercentage = 30;
    }

    let message = finalUserValue + "€";

    const data = {
      labels: ["User3", "User2", "User1"],
      datasets: [
        {
          data: [20, 25, 55],
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
        beforeDraw: function (chart) {
          let width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
          ctx.restore();
          let fontSize = (height / 120).toFixed(2);
          ctx.font = fontSize + "em Verdana, sans-serif";
          ctx.textBaseline = "middle";
          let text = message,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ];

    return (
      <Doughnut
        data={data}
        options={options}
        plugins={props.environment === "payment" ? plugins : [ChartDataLabels]}
      />
    );
  }
};

export default DoughnutChart;
