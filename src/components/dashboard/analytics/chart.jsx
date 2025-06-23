// src/components/Chart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", User: 4000, Estate: 2400, amt: 2400 },
  { name: "Feb", User: 3000, Estate: 1398, amt: 2210 },
  { name: "Mar", User: 2000, Estate: 9800, amt: 2290 },
  { name: "Apr", User: 2780, Estate: 3908, amt: 2000 },
  { name: "May", User: 1890, Estate: 4800, amt: 2181 },
  { name: "Jun", User: 2390, Estate: 3800, amt: 2500 },
  { name: "Jul", User: 3490, Estate: 4300, amt: 2100 },
];

const Chart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="User" stroke="red" />
      <Line type="monotone" dataKey="Estate" stroke="green" />
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
