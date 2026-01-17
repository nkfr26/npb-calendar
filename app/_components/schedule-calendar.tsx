// https://ui.shadcn.com/blocks/calendar#calendar-21

"use client";

import { format } from "date-fns";
import type {
  MonthChangeEventHandler,
  OnSelectHandler,
} from "react-day-picker";
import { ja } from "react-day-picker/locale";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn, formatDate } from "@/lib/utils";
import type { GroupedSchedules } from "./use-filter";
import { useHolidaysQuery } from "./use-holidays-query";

export function ScheduleCalendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  groupedSchedules,
}: {
  selected: Date | undefined;
  onSelect: OnSelectHandler<Date | undefined>;
  month: Date;
  onMonthChange: MonthChangeEventHandler;
  groupedSchedules: GroupedSchedules;
}) {
  const { data: holidays = {} } = useHolidaysQuery();
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
          const schedule = groupedSchedules[formatDate(day.date)];
          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...props}
              className="h-10 data-[selected-single=true]:border-2 data-[selected-single=true]:border-primary/40 data-[selected-single=true]:bg-transparent"
            >
              <span
                className={cn("font-medium", {
                  "text-blue-700": isSaturday,
                  "text-red-500": isHoliday,
                  "!opacity-25": !schedule,
                })}
              >
                {children}
              </span>
              {schedule ? (
                <span className="text-gray-600">{schedule.length}</span>
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
              aria-label="年月"
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
