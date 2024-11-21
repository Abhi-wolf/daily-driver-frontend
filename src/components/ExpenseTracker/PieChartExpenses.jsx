import { Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { cn, transformDateWithSlash } from "../../lib/utils";
import { useGetExpenses } from "../../hooks/expense/useExpense";
import { useSearchParams } from "react-router-dom";
import DataNotFound from "../DataNotFound";

export const description = "A donut chart with an active sector";

const chartConfig = {
  amount: {
    label: "amount",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-2))",
  },
  transportation: {
    label: "Outside Eating",
    color: "hsl(var(--chart-3))",
  },
  electricity: {
    label: "Electricity",
    color: "hsl(var(--chart-4))",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-5))",
  },
  fuel: {
    label: "Fuel",
    color: "hsl(var(--chart-1))",
  },
  health: {
    label: "Health",
    color: "hsl(var(--chart-2))",
  },

  shopping: {
    label: "Shopping",
    color: "hsl(var(--chart-4))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-5))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-4))",
  },
  home: {
    label: "Home",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

const normalizeCategory = (category) =>
  category.toLowerCase().replace(/\s/g, "");

function PieChartExpenses() {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("startDate");
  const end = searchParams.get("endDate");

  const { data } = useGetExpenses({ start, end });

  const chartData =
    data?.categoryData?.map(({ category, totalAmount }) => {
      const normalizedCategory = normalizeCategory(category);
      return {
        category,
        amount: totalAmount,
        fill: chartConfig[normalizedCategory]?.color || "hsl(var(--chart-3))",
      };
    }) || [];

  return (
    <Card className={cn("w-[340px] md:w-[580px] flex flex-col")}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Category Spendings</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData?.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={15}
                activeIndex={0}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <DataNotFound message="No expenses found during this period" />
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs md:text-sm">
        <div className="leading-none text-muted-foreground text-center">
          Showing spending during the period from{" "}
          <span className="italic text-gray-600 font-semibold mx-1">
            {transformDateWithSlash(start)}
          </span>{" "}
          and{" "}
          <span className="italic text-gray-600 font-semibold mx-1">
            {transformDateWithSlash(end)}
          </span>
          .
        </div>
      </CardFooter>
    </Card>
  );
}

export default PieChartExpenses;
