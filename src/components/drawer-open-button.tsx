import { cn } from "cn";
import { Funnel } from "lucide-react";
import type { ComponentProps } from "react";

export function DrawerOpenButton({
  isFiltered,
  className,
  ...props
}: ComponentProps<"button"> & { isFiltered: boolean }) {
  return (
    <button type="button" className={cn("btn indicator w-full bg-base-100", className)} {...props}>
      {isFiltered && <span className="indicator-item status status-primary status-lg" />}
      <Funnel className="size-4" /> 絞り込み
    </button>
  );
}
