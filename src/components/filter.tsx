import { Switch } from "@ark-ui/react/switch";
import { ToggleGroup } from "@ark-ui/react/toggle-group";
import { parseAsBoolean, useQueryState } from "nuqs";
import { type Dispatch, type SetStateAction, useId } from "react";

import { BasicMultiSelect } from "@/components/basic-multi-select";
import {
  DEFAULT_FILTER,
  type Filter as FilterType,
  filterSchedules,
} from "@/hooks/use-filter";
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
  const id = useId();
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
    ...schedulesForTeamSelect.flatMap((schedule) => [
      schedule.match.home,
      schedule.match.visitor,
    ]),
    ...filter.teams,
  ]);
  const stadiums = new Set([
    ...schedulesForStadiumSelect.map((schedule) => schedule.info.stadium),
    ...filter.stadiums,
  ]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <Switch.Root
          id={id}
          checked={isDependent}
          onCheckedChange={(details) => setIsDependent(details.checked)}
          className="flex cursor-pointer items-center gap-2"
        >
          <Switch.HiddenInput />
          <Switch.Control className="relative h-6 w-11 rounded-full bg-base-300 transition-colors data-[state=checked]:bg-primary">
            <Switch.Thumb className="absolute top-1 left-1 size-4 rounded-full bg-base-100 transition-transform data-[state=checked]:translate-x-5" />
          </Switch.Control>
          <Switch.Label className="text-sm">選択肢を連動させる</Switch.Label>
        </Switch.Root>
        <button
          type="button"
          className="btn btn-sm"
          disabled={!isFiltered}
          onClick={() => setFilter(DEFAULT_FILTER)}
        >
          リセット
        </button>
      </div>

      <BasicMultiSelect
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

      <ToggleGroup.Root
        className="join w-full"
        disabled={filter.teams.length === 0}
        value={filter.homeVisitor ? [filter.homeVisitor] : []}
        onValueChange={(details) =>
          setFilter((previous) => ({
            ...previous,
            homeVisitor: (details.value[0] ?? "") as FilterType["homeVisitor"],
          }))
        }
      >
        <ToggleGroup.Item
          value="ホーム"
          className="btn join-item flex-1 data-[state=on]:btn-primary"
        >
          ホーム
        </ToggleGroup.Item>
        <span
          aria-hidden="true"
          className="pointer-events-none z-10 w-px bg-base-300"
        />
        <ToggleGroup.Item
          value="ビジター"
          className="btn join-item flex-1 data-[state=on]:btn-primary"
        >
          ビジター
        </ToggleGroup.Item>
      </ToggleGroup.Root>

      <BasicMultiSelect
        placeholder="球場"
        items={stadiums}
        selectedValues={filter.stadiums}
        setSelectedValues={(values) =>
          setFilter((previous) => ({ ...previous, stadiums: values }))
        }
        ariaLabel="球場"
      />

      <ToggleGroup.Root
        className="join w-full"
        value={filter.dayNight ? [filter.dayNight] : []}
        onValueChange={(details) =>
          setFilter((previous) => ({
            ...previous,
            dayNight: (details.value[0] ?? "") as FilterType["dayNight"],
          }))
        }
      >
        <ToggleGroup.Item
          value="デーゲーム"
          className="btn join-item flex-1 data-[state=on]:btn-primary"
        >
          デーゲーム
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="ナイター"
          className="btn join-item flex-1 data-[state=on]:btn-primary"
        >
          ナイター
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
