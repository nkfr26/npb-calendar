import { useState } from "react";
import type { MonthChangeEventHandler } from "react-day-picker";

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
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState(() => getInitialMonth(new Date()));

  const onMonthChange: MonthChangeEventHandler = (month) => {
    const monthNumber = month.getMonth();
    if (monthNumber === 11) {
      setMonth(new Date(month.getFullYear() + 1, 2));
    } else if (monthNumber === 1) {
      setMonth(new Date(month.getFullYear() - 1, 10));
    } else {
      setMonth(month);
    }
    setSelected(undefined);
  };
  return { selected, onSelect: setSelected, month, onMonthChange };
};
