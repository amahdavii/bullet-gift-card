"use client";

import { useGetChartData } from "@/services/adminPanel";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export const MonthlyOrdersChart = () => {
  const { data, isLoading, error } = useGetChartData();

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Failed to load chart</p>;
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
          <XAxis dataKey="name" tickMargin={15} />
          <YAxis tickMargin={15} />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="black"
            strokeWidth={2}
            name="Total Amount"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
