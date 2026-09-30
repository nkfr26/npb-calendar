import { parseAsBoolean, useQueryState } from "nuqs";
import { type Dispatch, type SetStateAction } from "react";

import { MultiSelect } from "@/components/multi-select";
import {
  ToggleGroupItem,
  ToggleGroupRoot,
  ToggleGroupSeparator,
} from "@/components/ui/toggle-group";
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            role="switch"
            aria-checked={isDependent}
            className="toggle toggle-sm border-base-content/10 bg-base-content/10 checked:border-primary checked:bg-primary [&::before]:bg-white"
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
          setFilter((previous) => ({ ...previous, teams: values }));
          if (values.length === 0) {
            setFilter((previous) => ({ ...previous, homeVisitor: "" }));
          }
        }}
        ariaLabel="球団"
      />

      <ToggleGroupRoot
        disabled={filter.teams.length === 0}
        value={filter.homeVisitor ? [filter.homeVisitor] : []}
        onValueChange={(details) =>
          setFilter((previous) => ({
            ...previous,
            homeVisitor: (details.value[0] ?? "") as FilterType["homeVisitor"],
          }))
        }
      >
        <ToggleGroupItem value="ホーム">ホーム</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="ビジター">ビジター</ToggleGroupItem>
      </ToggleGroupRoot>

      <MultiSelect
        placeholder="球場"
        items={stadiums}
        selectedValues={filter.stadiums}
        setSelectedValues={(values) => setFilter((previous) => ({ ...previous, stadiums: values }))}
        ariaLabel="球場"
      />

      <ToggleGroupRoot
        value={filter.dayNight ? [filter.dayNight] : []}
        onValueChange={(details) =>
          setFilter((previous) => ({
            ...previous,
            dayNight: (details.value[0] ?? "") as FilterType["dayNight"],
          }))
        }
      >
        <ToggleGroupItem value="デーゲーム">デーゲーム</ToggleGroupItem>
        <ToggleGroupItem value="ナイター">ナイター</ToggleGroupItem>
      </ToggleGroupRoot>
    </div>
  );
}
