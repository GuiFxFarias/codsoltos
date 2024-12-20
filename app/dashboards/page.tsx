"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Area,
  ReferenceLine,
  Tooltip,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dash() {
  const data = [
    { name: "Group A", value: 700 },
    { name: "Group B", value: 500 },
    { name: "Group C", value: 1000 },
    { name: "Group D", value: 900 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h1 className="text-2xl ml-10 mt-10 text-white">Gráficos</h1>
      <div className="bg-white w-[100%] ">
        <ResponsiveContainer
          className="scale-125 max-md:scale-50 ease-in-out transition duration-700"
          width="40%"
          height={250}
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
