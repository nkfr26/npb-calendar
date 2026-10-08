import type { CalendarDate } from "@internationalized/date";

export function formatYearMonth(date: CalendarDate): string {
  return date.toString().slice(0, 7);
}
