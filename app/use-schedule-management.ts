import { useQuery } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { useState } from "react";

type Schedule = {
  date: string;
  match: { home: string; visitor: string };
  info: { stadium: string; time: string };
  ticket?: { primary: string; resale?: string | string[] };
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
    ticket?: { primary: string; resale?: string | string[] };
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
      ...(schedule.ticket && { ticket: schedule.ticket }),
    });
  }
  return grouped;
};

type Filter = {
  teams: string[];
  homeVisitor: string; // "" | "ホーム" | "ビジター"
  stadiums: string[];
  dayNight: string; // "" | "デーゲーム" | "ナイター"
};

const DEFAULT_FILTER: Filter = {
  teams: [],
  homeVisitor: "",
  stadiums: [],
  dayNight: "",
};

const filterSchedules = (schedules: Schedule[], filter: Filter): Schedule[] => {
  if (isEqual(filter, DEFAULT_FILTER)) return schedules;

  return schedules.filter((schedule) => {
    const teamSet = new Set(filter.teams);
    if (teamSet.size) {
      const isHome = teamSet.has(schedule.match.home);
      const isVisitor = teamSet.has(schedule.match.visitor);

      switch (filter.homeVisitor) {
        case "ホーム":
          if (!isHome) return false;
          break;
        case "ビジター":
          if (!isVisitor) return false;
          break;
        default:
          if (!isHome && !isVisitor) return false;
      }
    }

    const stadiumSet = new Set(filter.stadiums);
    if (stadiumSet.size && !stadiumSet.has(schedule.info.stadium)) return false;

    switch (filter.dayNight) {
      case "デーゲーム":
        if ("18:00" <= schedule.info.time) return false;
        break;
      case "ナイター":
        if (schedule.info.time < "18:00") return false;
    }

    return true;
  });
};

const useScheduleManagement = (month: Date) => {
  const monthNumber = month.getMonth() + 1;
  const { data } = useQuery({
    queryKey: ["schedules", monthNumber],
    queryFn: () => fetchSchedules(monthNumber),
    initialData: [],
    initialDataUpdatedAt: 0,
  });

  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);
  const baseFilter: Filter = {
    ...DEFAULT_FILTER,
    homeVisitor: filter.homeVisitor,
    dayNight: filter.dayNight,
  };

  const [isDependent, setIsDependent] = useState(false);
  const teamDropDownData = isDependent
    ? filterSchedules(data, {
        ...baseFilter,
        stadiums: filter.stadiums,
      })
    : data;
  const stadiumDropDownData = isDependent
    ? filterSchedules(data, {
        ...baseFilter,
        teams: filter.teams,
      })
    : data;
  return {
    teams: [
      ...teamDropDownData.flatMap((schedule) => [
        schedule.match.home,
        schedule.match.visitor,
      ]),
      ...filter.teams,
    ],
    stadiums: [
      ...stadiumDropDownData.map((schedule) => schedule.info.stadium),
      ...filter.stadiums,
    ],
    filter,
    setFilter,
    isDependent,
    setIsDependent,
    schedules: groupSchedulesByDate(filterSchedules(data, filter)),
    isFiltered: !isEqual(filter, DEFAULT_FILTER),
  };
};

export {
  useScheduleManagement,
  DEFAULT_FILTER,
  type Filter,
  type GroupedSchedules,
};
