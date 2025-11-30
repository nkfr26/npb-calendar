import { type ClassValue, clsx } from "clsx";
import { createParser } from "nuqs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
}

export const dateParser = createParser({
  parse(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  },
  serialize(value) {
    return formatDate(value);
  },
});

export const monthParser = createParser({
  parse(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  },
  serialize(value) {
    return formatDate(value).slice(0, 7);
  },
});
