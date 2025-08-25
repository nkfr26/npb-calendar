// https://wds-shadcn-registry.netlify.app/components/multi-select/

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

export function BasicMultiSelect({
  placeholder,
  items,
  selectedValues,
  setSelectedValues,
}: {
  placeholder: string;
  items: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}) {
  return (
    <MultiSelect values={selectedValues} onValuesChange={setSelectedValues}>
      <MultiSelectTrigger className="w-full">
        <MultiSelectValue placeholder={placeholder} overflowBehavior="wrap" />
      </MultiSelectTrigger>
      <MultiSelectContent search={false}>
        {/* Items must be wrapped in a group for proper styling */}
        <MultiSelectGroup>
          {[...new Set(items)].map((item) => (
            <MultiSelectItem key={item} value={item}>
              {item}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
}
