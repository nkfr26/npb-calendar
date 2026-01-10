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
  ariaLabel,
}: {
  placeholder: string;
  items: Set<string>;
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
  ariaLabel: string;
}) {
  return (
    <MultiSelect values={selectedValues} onValuesChange={setSelectedValues}>
      <MultiSelectTrigger className="w-full" aria-label={ariaLabel}>
        <MultiSelectValue placeholder={placeholder} overflowBehavior="wrap" />
      </MultiSelectTrigger>
      <MultiSelectContent search={false}>
        {/* Items must be wrapped in a group for proper styling */}
        <MultiSelectGroup className="pr-2.5">
          {[...items]
            .filter((item) => item !== "")
            .map((item) => (
              <MultiSelectItem key={item} value={item}>
                {item}
              </MultiSelectItem>
            ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
}
