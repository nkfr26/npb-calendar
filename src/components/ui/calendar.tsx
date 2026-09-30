import { cn } from "cn";
import type { ComponentProps } from "react";
import {
  Button,
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  DateValue,
} from "react-aria-components";
import type { CalendarSelectionMode } from "react-aria-components/Calendar";

export { CalendarGridBody, CalendarGridHeader };

export function Calendar<T extends DateValue, M extends CalendarSelectionMode>({
  className,
  ...props
}: ComponentProps<typeof AriaCalendar<T, M>>) {
  return (
    <AriaCalendar
      {...props}
      className={cn("rounded-box border border-base-300 bg-base-100 p-3", className)}
    />
  );
}

export function CalendarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("mb-2 grid grid-cols-[1fr_auto_1fr] items-center", className)} />
  );
}

export function CalendarPrevButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      slot="previous"
      className={cn("btn btn-square btn-ghost btn-sm", className)}
    />
  );
}

export function CalendarNextButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button {...props} slot="next" className={cn("btn btn-square btn-ghost btn-sm", className)} />
  );
}

export function CalendarGrid({ className, ...props }: ComponentProps<typeof AriaCalendarGrid>) {
  return (
    <AriaCalendarGrid
      {...props}
      className={cn("w-full table-fixed border-separate border-spacing-1", className)}
    />
  );
}

export function CalendarHeaderCell({
  className,
  ...props
}: ComponentProps<typeof AriaCalendarHeaderCell>) {
  return (
    <AriaCalendarHeaderCell
      {...props}
      className={cn("h-8 text-xs font-normal opacity-60", className)}
    />
  );
}

export function CalendarCell({ className, ...props }: ComponentProps<typeof AriaCalendarCell>) {
  return (
    <AriaCalendarCell
      {...props}
      className={(values) =>
        cn(
          "btn h-11 w-full flex-col gap-1 btn-ghost p-0 text-xs",
          values.isSelected && "border-2 border-primary/50 bg-transparent",
          typeof className === "function" ? className(values) : className,
        )
      }
    />
  );
}
