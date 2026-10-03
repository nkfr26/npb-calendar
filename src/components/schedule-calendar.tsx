import { CalendarDate, isSameDay, type DateValue } from "@internationalized/date";
import { cn } from "cn";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { I18nProvider } from "react-aria-components";

import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarNextButton,
  CalendarPrevButton,
  Calendar,
} from "@/components/ui/calendar";
import { useHolidaysQuery } from "@/queries/use-holidays-query";
import type { GroupedSchedulesByDate } from "@/queries/use-schedules-query";

const toDateValue = (date: Date) =>
  new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

const toDate = (dateValue: DateValue) =>
  new Date(dateValue.year, dateValue.month - 1, dateValue.day);

const CURRENT_YEAR = new Date().getFullYear();

export function ScheduleCalendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  groupedSchedulesByDate,
}: {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  month: Date;
  onMonthChange: (date: Date) => void;
  groupedSchedulesByDate: GroupedSchedulesByDate;
}) {
  const { data: holidays = {} } = useHolidaysQuery();

  const year = CURRENT_YEAR;
  const monthValue = toDateValue(month);
  const selectedValue = selected ? toDateValue(selected) : undefined;

  const [focusedValue, setFocusedValue] = useState<DateValue>(monthValue);
  const isSameMonth = (dateValue: DateValue) =>
    dateValue.year === monthValue.year && dateValue.month === monthValue.month;

  return (
    <I18nProvider locale="ja-JP">
      <Calendar
        aria-label="NPB試合日程"
        selectionMode="multiple"
        firstDayOfWeek="mon"
        minValue={new CalendarDate(year, 3, 1)}
        maxValue={new CalendarDate(year + 1, 11, 30)}
        isDateUnavailable={(date) => !groupedSchedulesByDate[date.toString()]?.length}
        value={selectedValue ? [selectedValue] : []}
        focusedValue={isSameMonth(focusedValue) ? focusedValue : monthValue}
        onFocusChange={(date) => {
          setFocusedValue(date);

          if (!isSameMonth(date)) {
            onMonthChange(toDate(date));
          }
        }}
        onChange={(value) => {
          if (value.length === 0) {
            onSelect(undefined);
            return;
          }

          const nextValue = selectedValue
            ? value.find((value) => !isSameDay(value, selectedValue))
            : value[0];

          if (nextValue) {
            onSelect(toDate(nextValue));
          }
        }}
      >
        {({ state }) => (
          <>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
              <a
                href={`https://npb.jp/games/${state.visibleRange.start.year}/schedule_${String(
                  state.visibleRange.start.month,
                ).padStart(2, "0")}_detail.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-square btn-ghost btn-sm"
                aria-label="NPB公式試合日程を新しいタブで開く"
                title="NPB公式試合日程"
              >
                <ExternalLink className="size-4" />
              </a>
              <span className="font-semibold">
                {state.visibleRange.start.year}年 {state.visibleRange.start.month}月
              </span>
              <div className="flex gap-1 justify-self-end">
                <CalendarPrevButton aria-label="前の月">
                  <ChevronLeft className="size-4" />
                </CalendarPrevButton>
                <CalendarNextButton aria-label="次の月">
                  <ChevronRight className="size-4" />
                </CalendarNextButton>
              </div>
            </div>
            <CalendarGrid weekdayStyle="short">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell
                    className={cn(
                      day === "土" && "text-blue-600 dark:text-blue-400",
                      day === "日" && "text-red-600 dark:text-red-400",
                    )}
                  >
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => {
                  const nativeDate = toDate(date);
                  const dateString = date.toString();
                  const schedules = groupedSchedulesByDate[dateString];
                  const isHoliday = nativeDate.getDay() === 0 || !!holidays[dateString];
                  const isSaturday = !isHoliday && nativeDate.getDay() === 6;
                  return (
                    <CalendarCell
                      date={date}
                      className={({ isOutsideMonth, isUnavailable }) =>
                        cn(
                          isOutsideMonth && "invisible",
                          isSaturday &&
                            "[--color-base-content:var(--color-blue-600)] dark:[--color-base-content:var(--color-blue-400)]",
                          isHoliday &&
                            "[--color-base-content:var(--color-red-600)] dark:[--color-base-content:var(--color-red-400)]",
                          isUnavailable && "btn-disabled",
                        )
                      }
                    >
                      {({ formattedDate }) => (
                        <>
                          {formattedDate}
                          {schedules && (
                            <span className="text-[10px] font-normal opacity-60">
                              {schedules.length}
                            </span>
                          )}
                        </>
                      )}
                    </CalendarCell>
                  );
                }}
              </CalendarGridBody>
            </CalendarGrid>
          </>
        )}
      </Calendar>
    </I18nProvider>
  );
}
