import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { keepPreviousData, noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { createParser, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

import { formatYearMonth } from "@/lib/utils";
import { holidaysQueryOptions } from "@/queries/holidays-query";
import { schedulesQueryOptions } from "@/queries/schedules-query";

const parseAsCalendarDate = createParser({
  parse(value) {
    try {
      return parseDate(value);
    } catch {
      return null;
    }
  },
  serialize: (date: CalendarDate) => date.toString(),
  eq: (a, b) => a.compare(b) === 0,
});

const parseAsCalendarMonth = createParser({
  parse: (value) => parseAsCalendarDate.parse(value + "-01"),
  serialize: formatYearMonth,
  eq: (a, b) => a.compare(b) === 0,
});

function getInitialMonth(date: CalendarDate) {
  if (date.month === 12) return new CalendarDate(date.year + 1, 3, 1);
  if (date.month <= 2) return new CalendarDate(date.year, 3, 1);
  return date.set({ day: 1 });
}

function getNavigableMonth(date: CalendarDate) {
  if (date.month === 12) return new CalendarDate(date.year + 1, 3, 1);
  if (date.month === 2) return new CalendarDate(date.year - 1, 11, 1);
  return date.set({ day: 1 });
}

export function useCalendar() {
  const [defaultMonth] = useState(() => getInitialMonth(today(getLocalTimeZone())));
  const [month, setMonth] = useQueryState("month", parseAsCalendarMonth.withDefault(defaultMonth));
  const [selected, setSelected] = useQueryState("selected", parseAsCalendarDate);

  const schedulesQuery = useQuery({
    ...schedulesQueryOptions(month),
    placeholderData: keepPreviousData,
  });
  const holidaysQuery = useQuery(holidaysQueryOptions);

  const queryClient = useQueryClient();
  useEffect(() => {
    void queryClient
      .query(schedulesQueryOptions(getNavigableMonth(month.add({ months: -1 }))))
      .catch(noop);
    void queryClient
      .query(schedulesQueryOptions(getNavigableMonth(month.add({ months: 1 }))))
      .catch(noop);
  }, [queryClient, month]);

  const onSelect = (date: CalendarDate | undefined) => setSelected(date ?? null);
  const onMonthChange = (date: CalendarDate) => {
    if (schedulesQuery.isPlaceholderData) return;
    setMonth(getNavigableMonth(date));
  };

  return {
    selected: selected ?? undefined,
    onSelect,
    month: schedulesQuery.data?.month ?? month,
    onMonthChange,
    schedules: schedulesQuery.data?.schedules ?? [],
    isPending: schedulesQuery.isPending || holidaysQuery.isPending,
  };
}
