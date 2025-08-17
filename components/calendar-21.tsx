"use client";

import { format } from "date-fns";
import type { ComponentProps, Dispatch, SetStateAction } from "react";
import { ja } from "react-day-picker/locale";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

export function Calendar21({
  date,
  setDate,
  month,
  setMonth,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  month: Date;
  setMonth: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      month={month}
      onMonthChange={setMonth}
      className="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
      components={{ DayButton }}
      formatters={{
        formatCaption: (date, options) => format(date, "y年 LLLL", options),
      }}
      locale={ja}
      showOutsideDays={false}
      weekStartsOn={1}
    />
  );
}

function DayButton({
  children,
  modifiers,
  day,
  ...props
}: ComponentProps<typeof CalendarDayButton>) {
  const isSaturday = day.date.getDay() === 6;
  const isHoliday = day.date.getDay() === 0;
  return (
    <CalendarDayButton
      day={day}
      modifiers={modifiers}
      {...props}
      className="data-[selected-single=true]:bg-transparent data-[selected-single=true]:border data-[selected-single=true]:border-primary/20"
    >
      <span
        className={
          isSaturday ? "text-blue-500" : isHoliday ? "text-red-500" : ""
        }
      >
        {children}
      </span>
      <span>{isSaturday ? 1 : null}</span>
    </CalendarDayButton>
  );
}
