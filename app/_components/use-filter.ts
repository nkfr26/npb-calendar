import { isEqual } from "es-toolkit";
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import type { Schedule } from "./use-schedules-query";

export const DEFAULT_FILTER = {
  teams: [],
  homeVisitor: "" as const,
  stadiums: [],
  dayNight: "" as const,
};

const homeVisitorValues = ["", "ホーム", "ビジター"] as const;
const dayNightValues = ["", "デーゲーム", "ナイター"] as const;

const parsers = {
  teams: parseAsArrayOf(parseAsString).withDefault(DEFAULT_FILTER.teams),
  homeVisitor: parseAsStringLiteral(homeVisitorValues).withDefault(
    DEFAULT_FILTER.homeVisitor,
  ),
  stadiums: parseAsArrayOf(parseAsString).withDefault(DEFAULT_FILTER.stadiums),
  dayNight: parseAsStringLiteral(dayNightValues).withDefault(
    DEFAULT_FILTER.dayNight,
  ),
};

export type Filter = inferParserType<typeof parsers>;

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
        case "":
          if (!isHome && !isVisitor) return false;
          break;
        case "ホーム":
          if (!isHome) return false;
          break;
        case "ビジター":
          if (!isVisitor) return false;
      }
    }

    const stadiumSet = new Set(filter.stadiums);
    if (stadiumSet.size && !stadiumSet.has(schedule.info.stadium)) return false;

    switch (filter.dayNight) {
      case "":
        break;
      case "デーゲーム":
        if ("18:00" <= schedule.info.time) return false;
        break;
      case "ナイター":
        if (schedule.info.time < "18:00") return false;
    }

    return true;
  });
};
