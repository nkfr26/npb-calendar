import { parseAsBoolean, useQueryState } from "nuqs";
import { type Dispatch, type SetStateAction, useId } from "react";
import { BasicMultiSelect } from "@/components/basic-multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DEFAULT_FILTER,
  type Filter as FilterType,
  filterSchedules,
} from "./use-filter";
import type { Schedule } from "./use-schedules-query";

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
    ? filterSchedules(schedules, {
        ...filter,
        teams: [],
      })
    : schedules;
  const schedulesForStadiumSelect = isDependent
    ? filterSchedules(schedules, {
        ...filter,
        stadiums: [],
      })
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
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id={id}
            checked={isDependent}
            onCheckedChange={setIsDependent}
            aria-label="選択肢を連動させる"
          />
          <Label htmlFor={id}>選択肢を連動させる</Label>
        </div>
        <Button
          disabled={!isFiltered}
          onClick={() => setFilter(DEFAULT_FILTER)}
        >
          リセット
        </Button>
      </div>
      <BasicMultiSelect
        placeholder="球団"
        items={teams}
        selectedValues={filter.teams}
        setSelectedValues={(values) => {
          setFilter((prev) => ({ ...prev, teams: values }));
          if (values.length === 0) {
            setFilter((prev) => ({ ...prev, homeVisitor: "" }));
          }
        }}
        ariaLabel="球団"
      />
      <ToggleGroup
        variant="outline"
        className="w-full"
        type="single"
        disabled={filter.teams.length === 0}
        value={filter.homeVisitor}
        onValueChange={(value) =>
          setFilter((prev) => ({ ...prev, homeVisitor: value }))
        }
      >
        <ToggleGroupItem value="ホーム">ホーム</ToggleGroupItem>
        <ToggleGroupItem value="ビジター">ビジター</ToggleGroupItem>
      </ToggleGroup>
      <BasicMultiSelect
        placeholder="球場"
        items={stadiums}
        selectedValues={filter.stadiums}
        setSelectedValues={(values) =>
          setFilter((prev) => ({ ...prev, stadiums: values }))
        }
        ariaLabel="球場"
      />
      <ToggleGroup
        variant="outline"
        className="w-full"
        type="single"
        value={filter.dayNight}
        onValueChange={(value) =>
          setFilter((prev) => ({ ...prev, dayNight: value }))
        }
      >
        <ToggleGroupItem value="デーゲーム">デーゲーム</ToggleGroupItem>
        <ToggleGroupItem value="ナイター">ナイター</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
