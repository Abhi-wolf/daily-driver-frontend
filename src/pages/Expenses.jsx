import { useSearchParams } from "react-router-dom";
import BarChart from "../components/ExpenseTracker/BarChart";
import ExpenseInfo from "../components/ExpenseTracker/ExpenseInfo";
import ExpenseTable from "../components/ExpenseTracker/ExpenseTable";
import PieChart from "../components/ExpenseTracker/PieChartExpenses";
import { useEffect } from "react";

function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Retrieve existing dates from the URL or default to empty strings
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  useEffect(() => {
    // If query params are missing, set them to default (first and last day of the month)
    if (!startDate || !endDate) {
      const today = new Date();

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split("T")[0];

      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

      // Set default query params if they are missing
      setSearchParams({
        startDate: startOfMonth,
        endDate: endOfMonth,
      });
    }
  }, [startDate, endDate]);

  return (
    <section className="w-full m-1 md:m-2 flex flex-col gap-6 overflow-y-auto relative">
      <ExpenseInfo />
      <div className="flex flex-wrap gap-4 justify-around">
        <BarChart />
        <PieChart />
      </div>
      <ExpenseTable />
    </section>
  );
}

export default Expenses;
