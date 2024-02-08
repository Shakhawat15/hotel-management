"use client";

import {
  Chart as CharJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Booking } from "@/models/booking";

CharJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
  const labels = userBookings.map((booking) => booking.hotelRoom.name);
  const amountSpent = userBookings.map((booking) => booking.totalPrice);
  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Amount Spent",
            data: amountSpent,
            backgroundColor: "#F27405",
            hoverBackgroundColor: "#F2C641",
            borderWidth: 1,
          },
        ],
      }}
    />
  ); 
};

export default Chart;
