import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatYearMonth(date: Date): string {
  return format(date, "yyyy-MM");
}
