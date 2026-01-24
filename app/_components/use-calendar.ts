import { createParser, useQueryState } from "nuqs";
import type {
  MonthChangeEventHandler,
  OnSelectHandler,
} from "react-day-picker";
import { Temporal } from "temporal-polyfill";
import { formatDate } from "@/lib/utils";

const createTemporalParser = <
  T extends Temporal.PlainDate | Temporal.PlainYearMonth,
>(
  from: (item: string) => T,
) =>
  createParser({
    parse(value) {
      try {
        return from(value);
      } catch {
        return null;
      }
    },
    serialize(value) {
      return value.toString();
    },
  });

const getInitialMonth = (yearMonth: Temporal.PlainYearMonth) => {
  const monthNumber = yearMonth.month;
  switch (monthNumber) {
    case 12:
      return Temporal.PlainYearMonth.from({
        year: yearMonth.year + 1,
        month: 3,
      });
    case 1:
    case 2:
      return Temporal.PlainYearMonth.from({
        year: yearMonth.year,
        month: 3,
      });
    default:
      return yearMonth;
  }
};

export const useCalendar = () => {
  const [selected, setSelected] = useQueryState(
    "selected",
    createTemporalParser(Temporal.PlainDate.from),
  );
  const onSelect: OnSelectHandler<Date | undefined> = (selected) => {
    setSelected(
      selected ? Temporal.PlainDate.from(formatDate(selected)) : null,
    );
  };

  const [month, setMonth] = useQueryState(
    "month",
    createTemporalParser(Temporal.PlainYearMonth.from).withDefault(
      getInitialMonth(Temporal.Now.plainDateISO().toPlainYearMonth()),
    ),
  );
  const onMonthChange: MonthChangeEventHandler = (month) => {
    const monthNumber = month.getMonth();
    switch (monthNumber) {
      case 11:
        setMonth(
          Temporal.PlainYearMonth.from({
            year: month.getFullYear() + 1,
            month: 3,
          }),
        );
        break;
      case 1:
        setMonth(
          Temporal.PlainYearMonth.from({
            year: month.getFullYear() - 1,
            month: 11,
          }),
        );
        break;
      default:
        setMonth(Temporal.PlainYearMonth.from(formatDate(month)));
    }
    setSelected(null);
  };

  return {
    selected: selected ? new Date(selected.toString()) : undefined,
    onSelect,
    month: new Date(month.year, month.month - 1, 1),
    onMonthChange,
  };
};
