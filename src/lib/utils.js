import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function transformDate(dateString) {
  const date = new Date(dateString);

  // Extracting year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function transformDateWithSlash(dateString) {
  const date = new Date(dateString);

  // Extracting year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}

export function convertToISOFormat(date) {
  if (!date) return "";
  const d = new Date(date);
  // Ensure the date is in the format YYYY-MM-DD
  return d.toISOString().split("T")[0];
}

export function getTimeFromDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes to always show two digits
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  return formattedTime;
}
