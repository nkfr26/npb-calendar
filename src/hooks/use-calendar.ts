import { createParser, useQueryState } from "nuqs";
import { useState } from "react";

import { formatDate, formatYearMonth } from "@/lib/utils";

const createDateParser = (serialize: (date: Date) => string) =>
  createParser({
    parse(value) {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    },
    serialize,
  });

function getInitialMonth(date: Date) {
  const month = date.getMonth() + 1;
  if (month === 12) return new Date(date.getFullYear() + 1, 2);
  if (month <= 2) return new Date(date.getFullYear(), 2);
  return date;
}

export function useCalendar() {
  const [defaultMonth] = useState(() => getInitialMonth(new Date()));
  const [selected, setSelected] = useQueryState("selected", createDateParser(formatDate));
  const [month, setMonth] = useQueryState(
    "month",
    createDateParser(formatYearMonth).withDefault(defaultMonth),
  );

  const onSelect = (date: Date | undefined) => setSelected(date ?? null);
  const onMonthChange = (date: Date) => {
    setSelected(null);

    const monthNumber = date.getMonth() + 1;
    if (monthNumber === 12) {
      setMonth(new Date(date.getFullYear() + 1, 2));
    } else if (monthNumber === 2) {
      setMonth(new Date(date.getFullYear() - 1, 10));
    } else {
      setMonth(date);
    }
  };

  return {
    selected: selected ?? undefined,
    onSelect,
    month: month ?? defaultMonth,
    onMonthChange,
  };
}
