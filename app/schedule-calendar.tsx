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
import { formatDate } from "@/lib/utils";

export function ScheduleCalendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  schedules,
}: {
  selected: Date | undefined;
  onSelect: OnSelectHandler<Date | undefined>;
  month: Date;
  onMonthChange: MonthChangeEventHandler;
  schedules: GroupedSchedules;
}) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      month={month}
      onMonthChange={onMonthChange}
      startMonth={new Date(month.getFullYear(), 2)}
      endMonth={new Date(month.getFullYear(), 10)}
      className="w-full rounded-lg border [&_th:nth-child(6)]:text-blue-700 [&_th:nth-child(7)]:text-red-500"
      components={{
        // biome-ignore lint/correctness/noNestedComponentDefinitions: to use `schedules`
        DayButton: ({ children, modifiers, day, ...props }) => {
          const [isSaturday, isHoliday] = [
            day.date.getDay() === 6,
            day.date.getDay() === 0,
          ];
          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...props}
              className="h-10 data-[selected-single=true]:border data-[selected-single=true]:border-primary/20 data-[selected-single=true]:bg-transparent"
            >
              <span
                className={
                  isSaturday
                    ? "text-blue-700"
                    : isHoliday
                      ? "text-red-500"
                      : "text-black"
                }
              >
                {children}
              </span>
              {schedules[formatDate(day.date)]?.length ? (
                <span className="text-gray-600">
                  {schedules[formatDate(day.date)].length}
                </span>
              ) : null}
            </CalendarDayButton>
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
