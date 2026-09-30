import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";
import { cn } from "cn";
import type { ComponentProps } from "react";

export function ToggleGroupRoot({
  className,
  ...props
}: ComponentProps<typeof ArkToggleGroup.Root>) {
  return <ArkToggleGroup.Root {...props} className={cn("join w-full", className)} />;
}

export function ToggleGroupItem({
  className,
  ...props
}: ComponentProps<typeof ArkToggleGroup.Item>) {
  return (
    <ArkToggleGroup.Item
      {...props}
      className={cn("btn join-item flex-1 data-[state=on]:btn-primary", className)}
    />
  );
}

export function ToggleGroupSeparator() {
  return <span aria-hidden="true" className="pointer-events-none w-px bg-base-100" />;
}
