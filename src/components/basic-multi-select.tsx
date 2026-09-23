import { createListCollection } from "@ark-ui/react/collection";
import { Portal } from "@ark-ui/react/portal";
import { Select } from "@ark-ui/react/select";
import { Check } from "lucide-react";

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
  const collection = createListCollection({
    items: [...items].filter(Boolean).map((value) => ({ label: value, value })),
  });

  return (
    <Select.Root
      collection={collection}
      multiple
      value={selectedValues}
      onValueChange={(details) => setSelectedValues(details.value)}
      positioning={{ sameWidth: true }}
    >
      <Select.Label className="sr-only">{ariaLabel}</Select.Label>
      <Select.Control>
        <Select.Trigger className="select-bordered select h-auto min-h-10 w-full justify-between py-1.5">
          <span className="flex min-w-0 flex-wrap gap-1">
            {selectedValues.length === 0 ? (
              <span className="text-base-content/60">{placeholder}</span>
            ) : (
              selectedValues.map((value) => (
                <span
                  key={value}
                  className="badge badge-outline border-base-content/20"
                >
                  {value}
                </span>
              ))
            )}
          </span>
        </Select.Trigger>
      </Select.Control>
      <Select.HiddenSelect />
      <Portal>
        <Select.Positioner className="!z-[60]">
          <Select.Content className="max-h-72 overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
            {collection.items.map((item) => (
              <Select.Item
                key={item.value}
                item={item}
                className="flex cursor-pointer items-center justify-between rounded-field px-3 py-2 outline-none hover:bg-base-200 data-[highlighted]:bg-base-200"
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="size-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
