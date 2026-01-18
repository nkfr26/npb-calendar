import { createParser, useQueryState } from "nuqs";
import type { MonthChangeEventHandler } from "react-day-picker";
import { formatDate } from "@/lib/utils";

const createDateParser = (serializeFn: (date: Date) => string) =>
  createParser({
    parse(dateString) {
      const date = new Date(dateString);
      return Number.isNaN(date.getTime()) ? null : date;
    },
    serialize: serializeFn,
  });

const getInitialMonth = (month: Date) => {
  const monthNumber = month.getMonth() + 1;

  switch (monthNumber) {
    case 12:
      return new Date(month.getFullYear() + 1, 2);
    case 1:
    case 2:
      return new Date(month.getFullYear(), 2);
    default:
      return month;
  }
};

export const useCalendar = () => {
  const [selected, setSelected] = useQueryState(
    "selected",
    createDateParser(formatDate),
  );
  const [month, setMonth] = useQueryState(
    "month",
    createDateParser((date) => formatDate(date).slice(0, 7)).withDefault(
      getInitialMonth(new Date()),
    ),
  );

  const onSelect = (selected: Date | undefined) => {
    setSelected(selected ?? null);
  };
  const onMonthChange: MonthChangeEventHandler = (month) => {
    const monthNumber = month.getMonth();
    switch (monthNumber) {
      case 11:
        setMonth(new Date(month.getFullYear() + 1, 2));
        break;
      case 1:
        setMonth(new Date(month.getFullYear() - 1, 10));
        break;
      default:
        setMonth(month);
    }
    setSelected(null);
  };
  return { selected: selected ?? undefined, onSelect, month, onMonthChange };
};
