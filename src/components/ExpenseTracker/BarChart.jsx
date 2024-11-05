import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "../../lib/utils";
import { useGetMonthlyExpenses } from "../../hooks/expense/useExpense";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 234, mobile: 120 },
  { month: "August", desktop: 214, mobile: 180 },
  { month: "September", desktop: 244, mobile: 140 },
  { month: "October", desktop: 214, mobile: 160 },
  { month: "November", desktop: 274, mobile: 190 },
  { month: "December", desktop: 204, mobile: 200 },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  curr: {
    label: "Current Year",
    color: "hsl(var(--chart-1))",
  },
  prev: {
    label: "Previous Year",
    color: "hsl(var(--chart-2))",
  },
};

function BarChart() {
  const { monthlyExpenses } = useGetMonthlyExpenses();

  const formattedData = monthlyExpenses?.map(({ month, curr, prev }) => ({
    month: monthNames[month - 1],
    curr,
    prev,
  }));

  return (
    <Card className={cn("w-[580px]")}>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          January - December {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formattedData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Show short month name
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="curr"
              type="monotone"
              stroke={chartConfig.curr.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="prev"
              type="monotone"
              stroke={chartConfig.prev.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Expense Comparison <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Comparing expenses of this year and the previous year
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChart;
