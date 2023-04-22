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

const DoughnutChart = (props) => {
  const dispatch = useDispatch();
  const paymentGroupDetails = useSelector(getPaymentGroupDetails);

  const userId = 1;

  useEffect(() => {
    if (paymentGroupDetails.status !== 200) {
      dispatch(fetchAsyncPaymentGroupDetailsSlice({ houseid, paymentid }));
    }
  }, [dispatch]);

  if (paymentGroupDetails.status === 200) {
    let obj = paymentGroupDetails.paymentGroupDetails;
    let totalValue = obj.value_payment;

    // map objGroup and return all colleagues
    let objGroup = paymentGroupDetails.paymentGroupDetails.UserPayment;
    const PaymentGroup = objGroup.map((user) => {
      let percentage = user.payment_percentage * totalValue;
      let name = user.user_id;

      return { percentage, name };
    });

    // for each user, save percentage and name in an array
    let percentageArray = [];
    let nameArray = [];
    PaymentGroup.forEach((user) => {
      percentageArray.push(user.percentage);
      nameArray.push(user.name);
    });

    // get our user value
    let ourUserValue = PaymentGroup.find(
      (user) => user.name === userId
    ).percentage;

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

    let message = ourUserValue + "€";
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
