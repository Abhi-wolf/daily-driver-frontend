import { useState } from "react";
import { getTimeFromDate, transformDateWithSlash } from "../lib/utils";
import { Clock } from "lucide-react";

function TodaysDate() {
  const [date, setDate] = useState(new Date());

  setTimeout(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000 * 60);
  });

  return (
    <p className="hidden md:flex gap-2 text-md font-semibold italic text-gray-400 items-center justify-center">
      <Clock className="w-5 h-5" />
      <span>{transformDateWithSlash(date)}</span>
      <span>{getTimeFromDate(date)}</span>
    </p>
  );
}

export default TodaysDate;
