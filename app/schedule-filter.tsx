import type { Dispatch, SetStateAction } from "react";
import { BasicMultiSelect } from "@/components/basic-multi-select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Filter } from "./use-schedule-management";

export function ScheduleFilter({
  teams,
  stadiums,
  filter,
  setFilter,
}: {
  teams: string[];
  stadiums: string[];
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}) {
  return (
    <>
      <BasicMultiSelect
        placeholder="球団"
        items={teams}
        selectedValues={filter.teams}
        setSelectedValues={(values) => setFilter({ ...filter, teams: values })}
      />
      <ToggleGroup
        variant="outline"
        className="w-full"
        type="single"
        disabled={filter.teams.length === 0}
        value={filter.homeVisitor}
        onValueChange={(value) => setFilter({ ...filter, homeVisitor: value })}
      >
        <ToggleGroupItem value="ホーム">ホーム</ToggleGroupItem>
        <ToggleGroupItem value="ビジター">ビジター</ToggleGroupItem>
      </ToggleGroup>
      <BasicMultiSelect
        placeholder="球場"
        items={stadiums}
        selectedValues={filter.stadiums}
        setSelectedValues={(values) =>
          setFilter({ ...filter, stadiums: values })
        }
      />
      <ToggleGroup
        variant="outline"
        className="w-full"
        type="single"
        value={filter.dayNight}
        onValueChange={(value) => setFilter({ ...filter, dayNight: value })}
      >
        <ToggleGroupItem value="デーゲーム">デーゲーム</ToggleGroupItem>
        <ToggleGroupItem value="ナイター">ナイター</ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
