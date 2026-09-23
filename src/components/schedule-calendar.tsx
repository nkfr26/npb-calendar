import { DatePicker } from "@ark-ui/react/date-picker";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { cn } from "cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatDate, formatYearMonth } from "@/lib/utils";
import { useHolidaysQuery } from "@/queries/use-holidays-query";
import type { GroupedSchedulesByDate } from "@/queries/use-schedules-query";

const toDateValue = (date: Date) =>
  new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
const toDate = (date: DateValue) =>
  new Date(date.year, date.month - 1, date.day);

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
  const year = new Date().getFullYear();

  return (
    <DatePicker.Root
      key={formatYearMonth(month)}
      inline
      selectionMode="single"
      locale="ja-JP"
      startOfWeek={1}
      min={new CalendarDate(year, 3, 1)}
      max={new CalendarDate(year + 1, 11, 30)}
      value={selected ? [toDateValue(selected)] : []}
      defaultFocusedValue={toDateValue(month)}
      onValueChange={({ value }) =>
        onSelect(value[0] ? toDate(value[0]) : undefined)
      }
      onVisibleRangeChange={({ visibleRange }) => {
        const nextMonth = toDate(visibleRange.start);
        if (
          nextMonth.getFullYear() !== month.getFullYear() ||
          nextMonth.getMonth() !== month.getMonth()
        ) {
          onMonthChange(nextMonth);
        }
      }}
      className="w-full rounded-lg border border-base-300 bg-base-100 p-3"
    >
      <DatePicker.Content>
        <DatePicker.Context>
          {(datePicker) => (
            <DatePicker.View view="day">
              <DatePicker.ViewControl className="mb-2 grid grid-cols-[auto_1fr_auto] items-center gap-2">
                <DatePicker.PrevTrigger
                  className="btn btn-square btn-ghost btn-sm"
                  aria-label="前の月"
                >
                  <ChevronLeft className="size-4" />
                </DatePicker.PrevTrigger>
                <a
                  href={`https://npb.jp/games/${month.getFullYear()}/schedule_${String(month.getMonth() + 1).padStart(2, "0")}_detail.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-semibold text-blue-700 underline visited:text-purple-700 dark:text-blue-400"
                >
                  {month.getFullYear()}年 {month.getMonth() + 1}月
                </a>
                <DatePicker.NextTrigger
                  className="btn btn-square btn-ghost btn-sm"
                  aria-label="次の月"
                >
                  <ChevronRight className="size-4" />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table className="w-full table-fixed border-separate border-spacing-1">
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {datePicker.weekDays.map((weekDay, index) => (
                      <DatePicker.TableHeader
                        key={weekDay.short}
                        className={cn(
                          "h-8 text-xs font-normal opacity-60",
                          index === 5 && "text-blue-700 dark:text-blue-400",
                          index === 6 && "text-red-600 dark:text-red-400",
                        )}
                      >
                        {weekDay.short}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {datePicker.getMonthWeeks().map((week) => (
                    <DatePicker.TableRow key={week.map(String).join("-")}>
                      {week.map((day) => {
                        const nativeDate = toDate(day);
                        const dateString = formatDate(nativeDate);
                        const schedules = groupedSchedulesByDate[dateString];
                        const outside = day.month !== month.getMonth() + 1;
                        const isSelected =
                          selected && formatDate(selected) === dateString;
                        const saturday = nativeDate.getDay() === 6;
                        const holiday =
                          nativeDate.getDay() === 0 || !!holidays[dateString];

                        return (
                          <DatePicker.TableCell
                            key={day.toString()}
                            value={day}
                          >
                            <DatePicker.TableCellTrigger
                              onClick={() => {
                                if (isSelected) {
                                  queueMicrotask(() => onSelect(undefined));
                                }
                              }}
                              className={cn(
                                "btn h-11 w-full min-w-0 flex-col gap-0 btn-ghost p-0 text-xs font-normal",
                                "data-[selected]:border-2 data-[selected]:border-primary/40 data-[selected]:bg-transparent",
                                outside && "invisible",
                                saturday && "text-blue-700 dark:text-blue-400",
                                holiday && "text-red-600 dark:text-red-400",
                                !schedules && "opacity-25",
                              )}
                            >
                              <span className="font-medium">{day.day}</span>
                              {schedules && (
                                <span className="text-[10px] opacity-60">
                                  {schedules.length}
                                </span>
                              )}
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        );
                      })}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
          )}
        </DatePicker.Context>
      </DatePicker.Content>
    </DatePicker.Root>
  );
}
