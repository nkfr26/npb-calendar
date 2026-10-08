import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { createParser, useQueryState } from "nuqs";
import { useState } from "react";

import { formatYearMonth } from "@/lib/utils";

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

export function useCalendar() {
  const [defaultMonth] = useState(() => getInitialMonth(today(getLocalTimeZone())));
  const [selected, setSelected] = useQueryState("selected", parseAsCalendarDate);
  const [month, setMonth] = useQueryState("month", parseAsCalendarMonth.withDefault(defaultMonth));

  const onSelect = (date: CalendarDate | undefined) => setSelected(date ?? null);
  const onMonthChange = (date: CalendarDate) => {
    setSelected(null);

    if (date.month === 12) {
      setMonth(new CalendarDate(date.year + 1, 3, 1));
    } else if (date.month === 2) {
      setMonth(new CalendarDate(date.year - 1, 11, 1));
    } else {
      setMonth(date.set({ day: 1 }));
    }
  };

  return { selected: selected ?? undefined, onSelect, month, onMonthChange };
}
