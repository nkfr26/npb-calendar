import { useQuery } from "@tanstack/react-query";
import type { groupBy } from "es-toolkit";
import { ofetch } from "ofetch";
import * as v from "valibot";

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

const fetchSchedules = async (date: Date): Promise<Schedule[]> => {
  const [year, month] = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
  ];
  try {
    const response = await ofetch(
      `https://nkfr26.github.io/npb-schedule/${year}/schedule_${month}_detail.json`,
    );
    return v.parse(v.array(scheduleSchema), response);
  } catch {
    return [];
  }
};

export const useSchedulesQuery = (date: Date) => {
  return useQuery({
    queryKey: ["schedules", date],
    queryFn: () => fetchSchedules(date),
  });
};

export type GroupedSchedulesByDate = ReturnType<
  typeof groupBy<Schedule, string>
>;
