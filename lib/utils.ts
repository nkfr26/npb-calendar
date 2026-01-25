import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Temporal } from "temporal-polyfill-lite";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return Temporal.Instant.from(date.toISOString())
    .toZonedDateTimeISO(Temporal.Now.timeZoneId())
    .toPlainDate()
    .toString();
}
