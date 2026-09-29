import { cn } from "cn";
import type { ComponentProps } from "react";
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  type CalendarProps as AriaCalendarProps,
  type CalendarSelectionMode,
  type DateValue,
} from "react-aria-components";

export { CalendarGridBody, CalendarGridHeader };

export function CalendarRoot<
  T extends DateValue,
  M extends CalendarSelectionMode = "single",
>({ className, ...props }: AriaCalendarProps<T, M>) {
  return (
    <AriaCalendar
      {...props}
      className={(values) =>
        cn(
          "rounded-box border border-base-300 bg-base-100 p-3",
          typeof className === "function" ? className(values) : className,
        )
      }
    />
  );
}

export function CalendarHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("mb-2 grid grid-cols-[1fr_auto_1fr] items-center", className)}
    />
  );
}

type CalendarNavigationButtonProps = Omit<ComponentProps<typeof AriaButton>, "slot">;

export function CalendarPrevButton({
  className,
  ...props
}: CalendarNavigationButtonProps) {
  return (
    <AriaButton
      {...props}
      slot="previous"
      className={(values) =>
        cn(
          "btn btn-square btn-ghost btn-sm",
          typeof className === "function" ? className(values) : className,
        )
      }
    />
  );
}

export function CalendarNextButton({
  className,
  ...props
}: CalendarNavigationButtonProps) {
  return (
    <AriaButton
      {...props}
      slot="next"
      className={(values) =>
        cn(
          "btn btn-square btn-ghost btn-sm",
          typeof className === "function" ? className(values) : className,
        )
      }
    />
  );
}

export function CalendarGrid({
  className,
  ...props
}: ComponentProps<typeof AriaCalendarGrid>) {
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

export function CalendarCell({
  className,
  ...props
}: ComponentProps<typeof AriaCalendarCell>) {
  return (
    <AriaCalendarCell
      {...props}
      className={(values) =>
        cn(
          "btn h-11 w-full flex-col gap-1 btn-ghost p-0 text-xs data-[selected]:border-2 data-[selected]:border-primary/40 data-[selected]:bg-transparent",
          typeof className === "function" ? className(values) : className,
        )
      }
    />
  );
}
