import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import EditOrDeleteExpenseDropDown from "./EditOrDeleteExpenseDropDown";

import { useGetExpenses } from "../../hooks/expense/useExpense";
import { MediumSpinner } from "../Spinners";
import { useSearchParams } from "react-router-dom";
import { transformDate, transformDateWithSlash } from "../../lib/utils";

function ExpenseTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const start = searchParams.get("startDate");
  const end = searchParams.get("endDate");

  const { data, isPending } = useGetExpenses({ start, end });

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  useEffect(() => {
    if (start) setStartDate(start);
    if (end) setEndDate(end);
  }, [start, end]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const params = new URLSearchParams();
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);

    setSearchParams({ startDate, endDate });
  }, [startDate, endDate]);

  return (
    <div className="m-8 flex flex-col gap-2">
      {/* Header with Date Selectors */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold italic underline underline-offset-1 decoration-wavy decoration-1">
          Spendings
        </h2>

        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>
      </div>

      {/* Table with Conditional Rendering */}
      <Table className="text-md">
        <TableCaption>
          A list of your expenses between{" "}
          <span className="italic text-gray-600 font-semibold mx-1">
            {transformDateWithSlash(startDate)}
          </span>
          and{" "}
          <span className="italic text-gray-600 font-semibold mx-1">
            {transformDateWithSlash(endDate)}
          </span>
          .
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] overflow-hidden">
              Description
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Mode Of Payment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Show Spinner When Loading */}
          {isPending ? (
            <TableRow key={-10}>
              <TableCell colSpan={6} className="text-center">
                <div className="flex justify-center items-center h-16">
                  <MediumSpinner />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            // Render Expenses when Data is Available
            data?.expenses?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.description}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell> {item.modeOfPayment}</TableCell>
                <TableCell>{transformDate(item.date)}</TableCell>
                <TableCell>₹ {item.amount}</TableCell>
                <TableCell className="text-right flex flex-row-reverse">
                  <EditOrDeleteExpenseDropDown expense={item} />
                </TableCell>
              </TableRow>
            ))
          )}

          {/* Handle Case When No Data Exists */}
          {!isPending && data?.expenses?.length === 0 && (
            <TableRow key="datapending">
              <TableCell
                colSpan={6}
                className="text-center text-gray-400 text-sm"
              >
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow className="text-lg italic font-semibold text-purple-600">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              ₹ {data?.totalSpent || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ExpenseTable;

// const data = [
//   {
//     id: 1,
//     description: "Groceries",
//     category: "Food",
//     amount: 2000,
//     date: "2024-10-22",
//     modeOfPayment: "Cash",
//   },
//   {
//     id: 2,
//     description: "Dinner at Restaurant",
//     category: "Food",
//     amount: 1500,
//     date: "2024-10-21",
//     modeOfPayment: "Credit Card",
//   },
//   {
//     id: 3,
//     description: "Movie Tickets",
//     category: "Entertainment",
//     amount: 800,
//     date: "2024-10-19",
//     modeOfPayment: "UPI",
//   },
//   {
//     id: 4,
//     description: "Electricity Bill",
//     category: "Utilities",
//     amount: 1200,
//     date: "2024-10-18",
//     modeOfPayment: "Net Banking",
//   },
//   {
//     id: 5,
//     description: "Gym Membership",
//     category: "Health",
//     amount: 3000,
//     date: "2024-10-17",
//     modeOfPayment: "Credit Card",
//   },
//   {
//     id: 6,
//     description: "Fuel",
//     category: "Transportation",
//     amount: 3500,
//     date: "2024-10-16",
//     modeOfPayment: "Credit Card",
//   },
//   {
//     id: 7,
//     description: "Internet Bill",
//     category: "Utilities",
//     amount: 500,
//     date: "2024-10-15",
//     modeOfPayment: "Net Banking",
//   },
//   {
//     id: 8,
//     description: "Coffee Shop",
//     category: "Food",
//     amount: 300,
//     date: "2024-10-14",
//     modeOfPayment: "Credit Card",
//   },
//   {
//     id: 9,
//     description: "Books",
//     category: "Education",
//     amount: 1000,
//     date: "2024-10-13",
//     modeOfPayment: "Cash",
//   },
//   {
//     id: 10,
//     description: "Clothing",
//     category: "Shopping",
//     amount: 2500,
//     date: "2024-10-12",
//     modeOfPayment: "Credit Card",
//   },
//   {
//     id: 11,
//     description: "Gifts",
//     category: "Personal",
//     amount: 1500,
//     date: "2024-10-11",
//     modeOfPayment: "UPI",
//   },
//   {
//     id: 12,
//     description: "Concert Tickets",
//     category: "Entertainment",
//     amount: 1200,
//     date: "2024-10-10",
//     modeOfPayment: "Net Banking",
//   },
//   {
//     id: 13,
//     description: "Mobile Phone Bill",
//     category: "Utilities",
//     amount: 800,
//     date: "2024-10-09",
//     modeOfPayment: "Credit Card",
//   },
//   {
//     id: 14,
//     description: "Restaurant Meal",
//     category: "Food",
//     amount: 1800,
//     date: "2024-10-08",
//     modeOfPayment: "Cash",
//   },
//   {
//     id: 15,
//     description: "Car Maintenance",
//     category: "Transportation",
//     amount: 4000,
//     date: "2024-10-07",
//     modeOfPayment: "Debit Card",
//   },
//   {
//     id: 16,
//     description: "Vacation",
//     category: "Travel",
//     amount: 10000,
//     date: "2024-10-06",
//     modeOfPayment: "Net Banking",
//   },
//   {
//     id: 17,
//     description: "Home Decor",
//     category: "Home",
//     amount: 2000,
//     date: "2024-10-05",
//     modeOfPayment: "UPI",
//   },
//   {
//     id: 18,
//     description: "Subscription",
//     category: "Entertainment",
//     amount: 500,
//     date: "2024-10-04",
//     modeOfPayment: "Debit Card",
//   },
//   {
//     id: 19,
//     description: "Groceries",
//     category: "Food",
//     amount: 1800,
//     date: "2024-10-03",
//     modeOfPayment: "Cash",
//   },
//   {
//     id: 20,
//     description: "Dinner at Restaurant",
//     category: "Food",
//     amount: 1600,
//     date: "2024-10-02",
//     modeOfPayment: "Debit Card",
//   },
// ];
