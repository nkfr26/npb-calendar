"use client";

import { Calendar21 } from "@/components/calendar-21";
import { formatDate } from "@/lib/utils";
import { ScheduleFilter } from "./schedule-filter";
import { useCalendar } from "./use-calendar";
import { useScheduleManagement } from "./use-schedule-management";

export default function Home() {
  const calendar = useCalendar();
  const {
    teams,
    stadiums,
    filter,
    setFilter,
    isDependent,
    setIsDependent,
    schedules,
  } = useScheduleManagement(calendar.month);

  console.log(
    "selected",
    calendar.selected?.toLocaleDateString(),
    schedules[calendar.selected ? formatDate(calendar.selected) : ""],
  );
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <ScheduleFilter
          teams={teams}
          stadiums={stadiums}
          filter={filter}
          setFilter={setFilter}
          isDependent={isDependent}
          setIsDependent={setIsDependent}
        />
        <Calendar21 {...calendar} schedules={schedules} />
      </main>
    </div>
  );
}
