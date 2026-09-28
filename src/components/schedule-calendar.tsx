import { CalendarDate, type DateValue } from "@internationalized/date";
import { cn } from "cn";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

import {
  DatePickerContent,
  DatePickerContext,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRoot,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerView,
  DatePickerViewControl,
} from "@/components/ui/date-picker";
import { formatDate } from "@/lib/utils";
import { useHolidaysQuery } from "@/queries/use-holidays-query";
import type { GroupedSchedulesByDate } from "@/queries/use-schedules-query";

const toDateValue = (date: Date) =>
  new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
const toDate = (date: DateValue) => new Date(date.year, date.month - 1, date.day);

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
  onMonthChange: (date: Date) => Date;
  groupedSchedulesByDate: GroupedSchedulesByDate;
}) {
  const { data: holidays = {} } = useHolidaysQuery();
  const year = new Date().getFullYear();
  const monthValue = toDateValue(month);
  const [focusedValue, setFocusedValue] = useState<DateValue>();
  const currentFocusedValue =
    focusedValue?.year === monthValue.year && focusedValue.month === monthValue.month
      ? focusedValue
      : monthValue;

  return (
    <DatePickerRoot
      inline
      selectionMode="single"
      locale="ja-JP"
      startOfWeek={1}
      min={new CalendarDate(year, 3, 1)}
      max={new CalendarDate(year + 1, 11, 30)}
      value={selected ? [toDateValue(selected)] : []}
      focusedValue={currentFocusedValue}
      onFocusChange={({ focusedValue: nextFocusedValue }) => {
        if (
          nextFocusedValue.year !== monthValue.year ||
          nextFocusedValue.month !== monthValue.month
        ) {
          setFocusedValue(toDateValue(onMonthChange(toDate(nextFocusedValue))));
        } else {
          setFocusedValue(nextFocusedValue);
        }
      }}
      onValueChange={({ value }) => onSelect(value[0] ? toDate(value[0]) : undefined)}
    >
      <DatePickerContent>
        <DatePickerContext>
          {(datePicker) => (
            <DatePickerView view="day">
              <DatePickerViewControl>
                <a
                  href={`https://npb.jp/games/${datePicker.visibleRange.start.year}/schedule_${String(datePicker.visibleRange.start.month).padStart(2, "0")}_detail.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-square btn-ghost btn-sm"
                  aria-label="NPB公式試合日程を新しいタブで開く"
                  title="NPB公式試合日程"
                >
                  <ExternalLink className="size-4" />
                </a>
                <span className="font-semibold">
                  {datePicker.visibleRange.start.year}年 {datePicker.visibleRange.start.month}月
                </span>
                <div className="flex items-center justify-self-end">
                  <DatePickerPrevTrigger aria-label="前の月">
                    <ChevronLeft className="size-4" />
                  </DatePickerPrevTrigger>
                  <DatePickerNextTrigger aria-label="次の月">
                    <ChevronRight className="size-4" />
                  </DatePickerNextTrigger>
                </div>
              </DatePickerViewControl>
              <DatePickerTable>
                <DatePickerTableHead>
                  <DatePickerTableRow>
                    {datePicker.weekDays.map((weekDay, index) => (
                      <DatePickerTableHeader
                        key={weekDay.short}
                        className={cn(
                          index === 5 && "text-blue-700 dark:text-blue-400",
                          index === 6 && "text-red-600 dark:text-red-400",
                        )}
                      >
                        {weekDay.short}
                      </DatePickerTableHeader>
                    ))}
                  </DatePickerTableRow>
                </DatePickerTableHead>
                <DatePickerTableBody>
                  {datePicker.getMonthWeeks().map((week) => (
                    <DatePickerTableRow key={week.map(String).join("-")}>
                      {week.map((day) => {
                        const nativeDate = toDate(day);
                        const dateString = day.toString();
                        const schedules = groupedSchedulesByDate[dateString];
                        const outside = day.month !== datePicker.visibleRange.start.month;
                        const isSelected = selected && formatDate(selected) === dateString;
                        const saturday = nativeDate.getDay() === 6;
                        const holiday = nativeDate.getDay() === 0 || !!holidays[dateString];

                        return (
                          <DatePickerTableCell key={dateString} value={day}>
                            <DatePickerTableCellTrigger
                              onClick={() => {
                                if (isSelected) {
                                  queueMicrotask(() => onSelect(undefined));
                                }
                              }}
                              onKeyDown={(event) => {
                                if (isSelected && (event.key === "Enter" || event.key === " ")) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  onSelect(undefined);
                                }
                              }}
                              className={cn(
                                outside && "invisible",
                                saturday && "text-blue-700 dark:text-blue-400",
                                holiday && "text-red-600 dark:text-red-400",
                                !schedules && "opacity-25",
                              )}
                            >
                              {day.day}
                              {schedules && (
                                <span className="text-[10px] font-normal opacity-60">
                                  {schedules.length}
                                </span>
                              )}
                            </DatePickerTableCellTrigger>
                          </DatePickerTableCell>
                        );
                      })}
                    </DatePickerTableRow>
                  ))}
                </DatePickerTableBody>
              </DatePickerTable>
            </DatePickerView>
          )}
        </DatePickerContext>
      </DatePickerContent>
    </DatePickerRoot>
  );
}
