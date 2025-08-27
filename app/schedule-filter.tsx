import { type Dispatch, type SetStateAction, useId } from "react";
import { BasicMultiSelect } from "@/components/basic-multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DEFAULT_FILTER, type Filter } from "./use-schedule-management";

export function ScheduleFilter({
  teams,
  stadiums,
  filter,
  setFilter,
  isDependent,
  setIsDependent,
}: {
  teams: string[];
  stadiums: string[];
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  isDependent: boolean;
  setIsDependent: Dispatch<SetStateAction<boolean>>;
}) {
  const id = useId();
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          checked={isDependent}
          onCheckedChange={setIsDependent}
        />
        <Label htmlFor={id}>選択肢を連動させる</Label>
      </div>
      <Button onClick={() => setFilter(DEFAULT_FILTER)}>リセット</Button>
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
