import { parseAsBoolean, useQueryState } from "nuqs";
import { type Dispatch, type SetStateAction } from "react";

import { MultiSelect } from "@/components/multi-select";
import { DEFAULT_FILTER, type Filter as FilterType, filterSchedules } from "@/hooks/use-filter";
import type { Schedule } from "@/queries/use-schedules-query";

export function Filter({
  schedules,
  filter,
  setFilter,
  isFiltered,
}: {
  schedules: Schedule[];
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  isFiltered: boolean;
}) {
  const [isDependent, setIsDependent] = useQueryState(
    "isDependent",
    parseAsBoolean.withDefault(false),
  );
  const schedulesForTeamSelect = isDependent
    ? filterSchedules(schedules, { ...filter, teams: [] })
    : schedules;
  const schedulesForStadiumSelect = isDependent
    ? filterSchedules(schedules, { ...filter, stadiums: [] })
    : schedules;
  const teams = new Set([
    ...schedulesForTeamSelect.flatMap((schedule) => [schedule.match.home, schedule.match.visitor]),
    ...filter.teams,
  ]);
  const stadiums = new Set([
    ...schedulesForStadiumSelect.map((schedule) => schedule.info.stadium),
    ...filter.stadiums,
  ]);

  const toggle = <K extends "homeVisitor" | "dayNight">(key: K, value: FilterType[K]) => {
    setFilter((previous) => ({
      ...previous,
      [key]: previous[key] === value ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            // oxlint-disable-next-line jsx-a11y/role-has-required-aria-props -- The native checked property exposes the switch state.
            role="switch"
            className="toggle border-base-content/10 bg-base-content/10 toggle-sm checked:border-primary checked:bg-primary [&::before]:bg-white"
            checked={isDependent}
            onChange={(event) => setIsDependent(event.currentTarget.checked)}
          />
          選択肢を連動させる
        </label>
        <button
          type="button"
          className="btn btn-sm"
          disabled={!isFiltered}
          onClick={() => setFilter(DEFAULT_FILTER)}
        >
          リセット
        </button>
      </div>

      <MultiSelect
        placeholder="球団"
        items={teams}
        selectedValues={filter.teams}
        setSelectedValues={(values) => {
          setFilter((previous) => ({
            ...previous,
            teams: values,
            homeVisitor: values.length ? previous.homeVisitor : "",
          }));
        }}
        ariaLabel="球団"
      />

      <fieldset className="join w-full gap-px" disabled={filter.teams.length === 0}>
        {(["ホーム", "ビジター"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter.homeVisitor === value}
            className="btn join-item flex-1 aria-pressed:btn-primary"
            onClick={() => toggle("homeVisitor", value)}
          >
            {value}
          </button>
        ))}
      </fieldset>

      <MultiSelect
        placeholder="球場"
        items={stadiums}
        selectedValues={filter.stadiums}
        setSelectedValues={(values) => setFilter((previous) => ({ ...previous, stadiums: values }))}
        ariaLabel="球場"
      />

      <fieldset className="join w-full gap-px">
        {(["デーゲーム", "ナイター"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter.dayNight === value}
            className="btn join-item flex-1 aria-pressed:btn-primary"
            onClick={() => toggle("dayNight", value)}
          >
            {value}
          </button>
        ))}
      </fieldset>
    </div>
  );
}
