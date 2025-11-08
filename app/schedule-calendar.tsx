// https://ui.shadcn.com/blocks/calendar#calendar-21

"use client";

import { format } from "date-fns";
import type {
  MonthChangeEventHandler,
  OnSelectHandler,
} from "react-day-picker";
import { ja } from "react-day-picker/locale";
import type { GroupedSchedules } from "@/app/use-schedule-management";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn, formatDate } from "@/lib/utils";
import type { Holidays } from "./use-holidays";

export function ScheduleCalendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  holidays,
  schedules,
}: {
  selected: Date | undefined;
  onSelect: OnSelectHandler<Date | undefined>;
  month: Date;
  onMonthChange: MonthChangeEventHandler;
  holidays: Holidays;
  schedules: GroupedSchedules;
}) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      month={month}
      onMonthChange={onMonthChange}
      startMonth={new Date(new Date().getFullYear(), 2)}
      endMonth={new Date(new Date().getFullYear() + 1, 10)}
      className="w-full rounded-lg border [&_th:nth-child(6)]:text-blue-700 [&_th:nth-child(7)]:text-red-500"
      components={{
        // biome-ignore lint/correctness/noNestedComponentDefinitions: to use `schedules`
        DayButton: ({ children, modifiers, day, ...props }) => {
          const [isSaturday, isHoliday] = [
            day.date.getDay() === 6,
            day.date.getDay() === 0 || !!holidays[formatDate(day.date)],
          ];
          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...props}
              className="h-10 data-[selected-single=true]:border-2 data-[selected-single=true]:border-primary/40 data-[selected-single=true]:bg-transparent"
              disabled={!schedules[formatDate(day.date)]}
            >
              <span
                className={`font-medium ${
                  isSaturday ? "text-blue-700" : isHoliday ? "text-red-500" : ""
                }`}
              >
                {children}
              </span>
              {schedules[formatDate(day.date)]?.length ? (
                <span className="text-gray-600">
                  {schedules[formatDate(day.date)]?.length}
                </span>
              ) : null}
            </CalendarDayButton>
          );
        },
        // biome-ignore lint/correctness/noNestedComponentDefinitions: to use `month`
        CaptionLabel: ({ children, className, ...props }) => {
          return (
            <a
              {...props}
              href={`https://npb.jp/games/${month.getFullYear()}/schedule_${(month.getMonth() + 1).toString().padStart(2, "0")}_detail.html`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                className,
                "z-50 text-[#0000EE] visited:text-[#551A8B] active:text-[#FF0000]",
              )}
            >
              {children}
            </a>
          );
        },
      }}
      formatters={{
        formatCaption: (date, options) => format(date, "y年 LLLL", options),
      }}
      locale={ja}
      showOutsideDays={false}
      weekStartsOn={1}
    />
  );
}
