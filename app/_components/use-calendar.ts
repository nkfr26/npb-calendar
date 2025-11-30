import { useQueryState } from "nuqs";
import type { MonthChangeEventHandler } from "react-day-picker";
import { dateParser, monthParser } from "@/lib/utils";

const getInitialMonth = (month: Date) => {
  const monthNumber = month.getMonth() + 1;

  if (monthNumber === 12) {
    return new Date(month.getFullYear() + 1, 2);
  } else if (monthNumber === 1 || monthNumber === 2) {
    return new Date(month.getFullYear(), 2);
  }
  return month;
};

export const useCalendar = () => {
  const [selected, setSelected] = useQueryState("selected", dateParser);
  const [month, setMonth] = useQueryState(
    "month",
    monthParser.withDefault(getInitialMonth(new Date())),
  );

  const onSelect = (selected: Date | undefined) => {
    setSelected(selected ?? null);
  };
  const onMonthChange: MonthChangeEventHandler = (month) => {
    const monthNumber = month.getMonth();
    if (monthNumber === 11) {
      setMonth(new Date(month.getFullYear() + 1, 2));
    } else if (monthNumber === 1) {
      setMonth(new Date(month.getFullYear() - 1, 10));
    } else {
      setMonth(month);
    }
    setSelected(null);
  };
  return { selected: selected ?? undefined, onSelect, month, onMonthChange };
};
