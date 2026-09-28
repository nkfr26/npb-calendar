import { createListCollection } from "@ark-ui/react/collection";
import { Portal } from "@ark-ui/react/portal";
import { Select as ArkSelect } from "@ark-ui/react/select";
import { cn } from "cn";
import type { ComponentProps } from "react";

export { createListCollection };
export const SelectRoot = ArkSelect.Root;
export const SelectControl = ArkSelect.Control;
export const SelectHiddenSelect = ArkSelect.HiddenSelect;
export const SelectItemText = ArkSelect.ItemText;
export const SelectItemIndicator = ArkSelect.ItemIndicator;
export const SelectPortal = Portal;

export function SelectLabel({ className, ...props }: ComponentProps<typeof ArkSelect.Label>) {
  return <ArkSelect.Label {...props} className={cn("sr-only", className)} />;
}

export function SelectTrigger({ className, ...props }: ComponentProps<typeof ArkSelect.Trigger>) {
  return (
    <ArkSelect.Trigger
      {...props}
      className={cn("select h-auto min-h-10.5 w-full py-2", className)}
    />
  );
}

export function SelectPositioner({
  className,
  ...props
}: ComponentProps<typeof ArkSelect.Positioner>) {
  return <ArkSelect.Positioner {...props} className={cn("!z-[calc(infinity)]", className)} />;
}

export function SelectContent({ className, ...props }: ComponentProps<typeof ArkSelect.Content>) {
  return (
    <ArkSelect.Content
      {...props}
      className={cn(
        "max-h-72 overflow-y-auto rounded-field border border-base-content/20 bg-base-100 p-2",
        className,
      )}
    />
  );
}

export function SelectItem({ className, ...props }: ComponentProps<typeof ArkSelect.Item>) {
  return (
    <ArkSelect.Item
      {...props}
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-field p-2",
        "hover:bg-base-content/10 active:bg-neutral active:text-neutral-content",
        className,
      )}
    />
  );
}
