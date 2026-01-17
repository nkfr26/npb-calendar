import { isEqual } from "es-toolkit";
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
} from "nuqs";
import type { Schedule } from "./use-schedules-query";

const parsers = {
  teams: parseAsArrayOf(parseAsString).withDefault([]),
  homeVisitor: parseAsString.withDefault(""), // "" | "ホーム" | "ビジター"
  stadiums: parseAsArrayOf(parseAsString).withDefault([]),
  dayNight: parseAsString.withDefault(""), // "" | "デーゲーム" | "ナイター"
};

export type Filter = inferParserType<typeof parsers>;

export const DEFAULT_FILTER: Filter = {
  teams: [],
  homeVisitor: "",
  stadiums: [],
  dayNight: "",
};

export const useFilter = () => {
  const [filter, setFilter] = useQueryStates(parsers);
  return { filter, setFilter, isFiltered: !isEqual(filter, DEFAULT_FILTER) };
};

export const filterSchedules = (
  schedules: Schedule[],
  filter: Filter,
): Schedule[] => {
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

export type GroupedSchedules = {
  [date: string]: {
    match: { home: string; visitor: string };
    info: { stadium: string; time: string };
    ticket?: { primary: string; resale?: string | string[] };
  }[];
};

export const groupSchedulesByDate = (
  schedules: Schedule[],
): GroupedSchedules => {
  const grouped: GroupedSchedules = {};
  for (const schedule of schedules) {
    if (!grouped[schedule.date]) {
      grouped[schedule.date] = [];
    }
    grouped[schedule.date]?.push({
      match: schedule.match,
      info: schedule.info,
      ...(schedule.ticket && { ticket: schedule.ticket }),
    });
  }
  return grouped;
};
