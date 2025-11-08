import { useState } from "react";
import type { MonthChangeEventHandler } from "react-day-picker";

export const useCalendar = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState(new Date());
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
