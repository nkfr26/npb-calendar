import { createListCollection } from "@ark-ui/react/collection";
import { Select as ArkSelect } from "@ark-ui/react/select";
import { cn } from "cn";
import type { ComponentProps } from "react";

export { createListCollection };
export const SelectRoot = ArkSelect.Root;
export const SelectControl = ArkSelect.Control;
export const SelectHiddenSelect = ArkSelect.HiddenSelect;
export const SelectItemText = ArkSelect.ItemText;
export const SelectItemIndicator = ArkSelect.ItemIndicator;

export function SelectLabel({ className, ...props }: ComponentProps<typeof ArkSelect.Label>) {
  return <ArkSelect.Label {...props} className={cn("sr-only", className)} />;
}

export function SelectTrigger({ className, ...props }: ComponentProps<typeof ArkSelect.Trigger>) {
  return (
    <ArkSelect.Trigger
      {...props}
      className={cn("select h-auto min-h-10.5 w-full cursor-pointer py-2", className)}
    />
  );
}

export function SelectPositioner({
  className,
  ...props
}: ComponentProps<typeof ArkSelect.Positioner>) {
  return <ArkSelect.Positioner {...props} className={cn("!z-50", className)} />;
}

export function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof ArkSelect.Content>) {
  return (
    <ArkSelect.Content
      {...props}
      data-no-drag
      className={cn(
        "overflow-hidden rounded-field border border-base-content/20 bg-base-100",
        "origin-(--transform-origin)",
        "motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:zoom-in-95",
        "motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=closed]:zoom-out-95",
        className,
      )}
    >
      <div className="max-h-72 overflow-y-auto overscroll-contain p-2">{children}</div>
    </ArkSelect.Content>
  );
}

export function SelectItem({ className, ...props }: ComponentProps<typeof ArkSelect.Item>) {
  return (
    <ArkSelect.Item
      {...props}
      className={cn(
        "interaction-surface flex items-center justify-between rounded-field p-2",
        className,
      )}
    />
  );
}
