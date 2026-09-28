import { useQuery } from "@tanstack/react-query";
import type { groupBy } from "es-toolkit";
import { ofetch } from "ofetch";
import * as v from "valibot";

import { formatYearMonth } from "@/lib/utils";

const scheduleSchema = v.object({
  date: v.string(),
  match: v.object({
    home: v.string(),
    visitor: v.string(),
  }),
  info: v.object({
    stadium: v.string(),
    time: v.string(),
  }),
  ticket: v.optional(
    v.object({
      primary: v.string(),
      resale: v.optional(v.union([v.string(), v.array(v.string())])),
    }),
  ),
});

export type Schedule = v.InferOutput<typeof scheduleSchema>;

async function fetchSchedules(date: Date): Promise<Schedule[]> {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  try {
    const response = await ofetch(
      `https://nkfr26.github.io/npb-schedule/${year}/schedule_${month}_detail.json`,
    );
    return v.parse(v.array(scheduleSchema), response);
  } catch {
    return [];
  }
}

export function useSchedulesQuery(date: Date) {
  return useQuery({
    queryKey: ["schedules", formatYearMonth(date)],
    queryFn: () => fetchSchedules(date),
  });
}

export type GroupedSchedulesByDate = ReturnType<typeof groupBy<Schedule, string>>;
