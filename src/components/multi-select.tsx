import { Check } from "lucide-react";

import {
  createListCollection,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
} from "@/components/ui/select";

export function MultiSelect({
  label,
  items,
  selectedValues,
  setSelectedValues,
}: {
  label: string;
  items: Set<string>;
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}) {
  const collection = createListCollection({
    items: [...items].filter(Boolean).map((value) => ({ label: value, value })),
  });
  return (
    <SelectRoot
      collection={collection}
      multiple
      value={selectedValues}
      onValueChange={(details) => setSelectedValues(details.value)}
      positioning={{ sameWidth: true }}
    >
      <SelectLabel>{label}</SelectLabel>
      <SelectControl className="floating-label">
        {selectedValues.length > 0 && <span aria-hidden="true">{label}</span>}
        <SelectTrigger>
          <span className="flex flex-wrap gap-1">
            {selectedValues.length === 0 && (
              <span aria-hidden="true" className="text-base-content/60">
                {label}
              </span>
            )}
            {selectedValues.map((value) => (
              <span key={value} className="badge badge-outline border-[color:var(--input-color)]">
                {value}
              </span>
            ))}
          </span>
        </SelectTrigger>
      </SelectControl>
      <SelectHiddenSelect />
      <SelectPositioner>
        <SelectContent>
          {collection.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator>
                <Check className="size-4" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </SelectRoot>
  );
}
