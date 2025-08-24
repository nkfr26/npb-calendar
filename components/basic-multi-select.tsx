import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

export function BasicMultiSelect({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      <MultiSelect values={selectedValues} onValuesChange={setSelectedValues}>
        <MultiSelectTrigger className="w-full">
          <MultiSelectValue overflowBehavior="wrap" />
        </MultiSelectTrigger>
        <MultiSelectContent search={false}>
          {/* Items must be wrapped in a group for proper styling */}
          <MultiSelectGroup>
            {Array.from(new Set(items)).map((item) => (
              <MultiSelectItem key={item} value={item}>
                {item}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  );
}
