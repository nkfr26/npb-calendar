import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Schedule = {
  date: string;
  match: { home: string; visitor: string };
  info: { stadium: string; time: string };
};

const fetchSchedules = async (month: number): Promise<Schedule[]> => {
  const response = await fetch(
    `https://nkfr26.github.io/npb-schedule/schedule_${month.toString().padStart(2, "0")}_detail.json`,
  );
  return response.ok ? await response.json() : [];
};

type GroupedSchedules = {
  [date: string]: {
    match: { home: string; visitor: string };
    info: { stadium: string; time: string };
  }[];
};

const groupSchedulesByDate = (schedules: Schedule[]): GroupedSchedules => {
  const grouped: GroupedSchedules = {};
  for (const schedule of schedules) {
    if (!grouped[schedule.date]) {
      grouped[schedule.date] = [];
    }
    grouped[schedule.date].push({
      match: schedule.match,
      info: schedule.info,
    });
  }
  return grouped;
};

// TODO: フィルタリング
type Filter = {
  teams: string[];
  stadiums: string[];
  // "" | "ホーム" | "ビジター"
  homeVisitor: string;
  // "" | "デーゲーム" | "ナイター"
  dayNight: string;
};

const useScheduleManagement = (month: Date) => {
  const monthNumber = month.getMonth() + 1;
  const { data } = useQuery({
    queryKey: ["schedules", monthNumber],
    queryFn: () => fetchSchedules(monthNumber),
  });

  const [filter, setFilter] = useState<Filter>({
    teams: [],
    stadiums: [],
    homeVisitor: "",
    dayNight: "",
  });
  return {
    teams:
      data?.flatMap((schedule) => [
        schedule.match.home,
        schedule.match.visitor,
      ]) || [],
    stadiums: data?.map((schedule) => schedule.info.stadium) || [],
    filter,
    setFilter,
    schedules: groupSchedulesByDate(data || []),
  };
};

export { useScheduleManagement, type Filter, type GroupedSchedules };
