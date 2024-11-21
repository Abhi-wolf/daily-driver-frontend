import { PlusCircle } from "lucide-react";
import { useGetExpenseSummary } from "../../hooks/expense/useExpense";
import { Button } from "../ui/button";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";
import BudgetForm from "./BudgetForm";

function ExpenseInfo() {
  const [addExpense, setAddExpense] = useState(false);
  const [addBudget, setAddBudget] = useState(false);
  const { expenseSummary, isPending, isError } = useGetExpenseSummary();

  return (
    <div className="flex justify-around gap-8 m-4 p-4 flex-wrap">
      <div className="border-2 border-gray-100 rounded-lg w-[300px] h-[140px] shadow-lg p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl underline underline-offset-1 decoration-wavy decoration-1 font-semibold">
            Budget
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAddBudget(true)}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-500 font-semibold p-2 text-xl">
          ₹ {expenseSummary?.currentMonthBudget}
        </p>
        <div className="flex items-center text-green-500 text-sm">
          <span className="flex gap-2 items-center">
            Previous Month :{" "}
            <span className="text-xs">₹ {expenseSummary?.prevMonthBudget}</span>
          </span>
        </div>
      </div>
      <div className="border-2 border-gray-100 rounded-lg w-[300px] h-[140px] shadow-lg p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl underline underline-offset-1 decoration-wavy decoration-1 font-semibold">
            Expenses
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAddExpense(true)}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-500 font-semibold p-2 text-xl">
          ₹ {expenseSummary?.currentMonthExpenses}
        </p>
        <div className="flex items-center text-red-500 text-sm">
          <span className="flex gap-2 items-center">
            Previous Month :{" "}
            <span className="text-xs">
              ₹ {expenseSummary?.prevoiusMonthExpenses}
            </span>
          </span>
        </div>
      </div>
      <div className="border-2 border-gray-100 rounded-lg w-[300px] h-[140px] shadow-lg p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl underline underline-offset-1 decoration-wavy decoration-1 font-semibold">
            Savings
          </h3>
          {/* <span className="text-md text-purple-600">40%</span> */}
        </div>
        <p className="text-gray-500 font-semibold p-2 text-xl">
          ₹ {expenseSummary?.currentMonthSavings}
        </p>
        <div className="flex items-center text-green-500 text-sm">
          <span className="flex gap-2 items-center">
            Previous Month :{" "}
            <span className="text-xs">
              ₹ {expenseSummary?.prevMonthSavings}
            </span>
          </span>
        </div>
      </div>

      <ExpenseForm isOpen={addExpense} onClose={setAddExpense} />
      <BudgetForm
        isOpen={addBudget}
        onClose={setAddBudget}
        budget={expenseSummary?.currentMonthBudget}
      />
    </div>
  );
}

export default ExpenseInfo;
