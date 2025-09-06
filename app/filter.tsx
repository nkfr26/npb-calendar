import { type Dispatch, type SetStateAction, useId } from "react";
import { BasicMultiSelect } from "@/components/basic-multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DEFAULT_FILTER,
  type Filter as FilterType,
} from "./use-schedule-management";

export function Filter({
  teams,
  stadiums,
  filter,
  setFilter,
  isDependent,
  setIsDependent,
}: {
  teams: Set<string>;
  stadiums: Set<string>;
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  isDependent: boolean;
  setIsDependent: Dispatch<SetStateAction<boolean>>;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id={id}
            checked={isDependent}
            onCheckedChange={setIsDependent}
          />
          <Label htmlFor={id}>選択肢を連動させる</Label>
        </div>
        <Button onClick={() => setFilter(DEFAULT_FILTER)}>リセット</Button>
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
        <ToggleGroupItem value="ナイター">18時～</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
