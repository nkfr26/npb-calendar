import { useState } from "react";
import type { MonthChangeEventHandler } from "react-day-picker";

export const useCalendar = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState(new Date());
  const onMonthChange: MonthChangeEventHandler = (month) => {
    setMonth(month);
    setSelected(undefined);
  };
  return { selected, onSelect: setSelected, month, onMonthChange };
};
