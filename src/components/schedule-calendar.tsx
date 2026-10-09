import {
  CalendarDate,
  getDayOfWeek,
  isSameDay,
  toCalendarDate,
  type DateValue,
} from "@internationalized/date";
import { cn } from "cn";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

import {
  DatePickerContent,
  DatePickerContext,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRangeText,
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
import { useHolidaysQuery } from "@/queries/use-holidays-query";
import type { GroupedSchedulesByDate } from "@/queries/use-schedules-query";

const CURRENT_YEAR = new Date().getFullYear();

export function ScheduleCalendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  groupedSchedulesByDate,
}: {
  selected: CalendarDate | undefined;
  onSelect: (date: CalendarDate | undefined) => void;
  month: CalendarDate;
  onMonthChange: (date: CalendarDate) => void;
  groupedSchedulesByDate: GroupedSchedulesByDate;
}) {
  const { data: holidays = {} } = useHolidaysQuery();

  const [focusedValue, setFocusedValue] = useState<DateValue>(month);
  const isSameMonth = (dateValue: DateValue) =>
    dateValue.year === month.year && dateValue.month === month.month;

  return (
    <DatePickerRoot
      inline
      locale="ja-JP"
      startOfWeek={1}
      // Multiple mode provides native deselection; the controlled value holds at most one date.
      selectionMode="multiple"
      min={new CalendarDate(CURRENT_YEAR, 3, 1)}
      max={new CalendarDate(CURRENT_YEAR + 1, 11, 30)}
      isDateUnavailable={(date) => !groupedSchedulesByDate[date.toString()]?.length}
      value={selected ? [selected] : []}
      focusedValue={isSameMonth(focusedValue) ? focusedValue : month}
      onFocusChange={({ focusedValue }) => {
        setFocusedValue(focusedValue);

        if (!isSameMonth(focusedValue)) {
          onMonthChange(toCalendarDate(focusedValue));
        }
      }}
      onValueChange={({ value }) => {
        const date = selected ? value.find((date) => !isSameDay(date, selected)) : value[0];
        onSelect(date && toCalendarDate(date));
      }}
    >
      {/* The installed Ark UI searches Content for the cell to focus during keyboard navigation. */}
      <DatePickerContent>
        <DatePickerContext>
          {(datePicker) => (
            <DatePickerView view="day">
              <DatePickerViewControl>
                <a
                  href={`https://npb.jp/games/${datePicker.visibleRange.start.year}/schedule_${String(
                    datePicker.visibleRange.start.month,
                  ).padStart(2, "0")}_detail.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-square btn-ghost btn-sm"
                  aria-label="NPB公式試合日程を新しいタブで開く"
                  title="NPB公式試合日程"
                >
                  <ExternalLink className="size-4" />
                </a>
                <DatePickerRangeText>
                  {datePicker.visibleRange.start.year}年 {datePicker.visibleRange.start.month}月
                </DatePickerRangeText>
                <div className="flex gap-1 justify-self-end">
                  <DatePickerPrevTrigger aria-label="前の月">
                    <ChevronLeft className="size-4" />
                  </DatePickerPrevTrigger>
                  <DatePickerNextTrigger aria-label="次の月">
                    <ChevronRight className="size-4" />
                  </DatePickerNextTrigger>
                </div>
              </DatePickerViewControl>
              <DatePickerTable aria-label="NPB試合日程" aria-multiselectable={false}>
                <DatePickerTableHead>
                  <DatePickerTableRow>
                    {datePicker.weekDays.map((day, index) => (
                      <DatePickerTableHeader
                        key={day.short}
                        className={cn(
                          index === 5 && "text-blue-600 dark:text-blue-400",
                          index === 6 && "text-red-600 dark:text-red-400",
                        )}
                      >
                        {day.short}
                      </DatePickerTableHeader>
                    ))}
                  </DatePickerTableRow>
                </DatePickerTableHead>
                <DatePickerTableBody>
                  {datePicker.weeks.map((week) => (
                    <DatePickerTableRow key={week[0]?.toString()}>
                      {week.map((date) => {
                        const dateString = date.toString();
                        const schedules = groupedSchedulesByDate[dateString];
                        const weekday = getDayOfWeek(date, "ja-JP", "sun");
                        const isHoliday = weekday === 0 || !!holidays[dateString];
                        const isSaturday = !isHoliday && weekday === 6;
                        return (
                          <DatePickerTableCell key={dateString} value={date}>
                            <DatePickerTableCellTrigger
                              className={cn(
                                !isSameMonth(date) && "invisible",
                                isSaturday &&
                                  "[--color-base-content:var(--color-blue-600)] dark:[--color-base-content:var(--color-blue-400)]",
                                isHoliday &&
                                  "[--color-base-content:var(--color-red-600)] dark:[--color-base-content:var(--color-red-400)]",
                                !schedules?.length && "btn-disabled",
                              )}
                            >
                              {date.day}
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
