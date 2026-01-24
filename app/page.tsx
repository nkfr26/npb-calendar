"use client";

import { useState } from "react";
import { Filter } from "./_components/filter";
import { FilterCard } from "./_components/filter-card";
import { DrawerOpenButton, FilterDrawer } from "./_components/filter-drawer";
import { ScheduleCalendar } from "./_components/schedule-calendar";
import { ScheduleViewer } from "./_components/schedule-viewer";
import { useCalendar } from "./_components/use-calendar";
import { filterSchedules, useFilter } from "./_components/use-filter";
import {
  groupSchedulesByDate,
  useSchedulesQuery,
} from "./_components/use-schedules-query";

export default function Home() {
  const calendar = useCalendar();
  const { data: schedules = [] } = useSchedulesQuery(calendar.month);
  const { filter, setFilter, isFiltered } = useFilter();
  const groupedSchedules = groupSchedulesByDate(
    filterSchedules(schedules, filter),
  );
  const [open, setOpen] = useState(false);
  return (
    <main className="mx-auto flex h-full w-full max-w-6xl gap-4 p-4">
      <div className="hidden md:block">
        <FilterCard className="sticky top-18">
          <Filter
            schedules={schedules}
            filter={filter}
            setFilter={setFilter}
            isFiltered={isFiltered}
          />
        </FilterCard>
      </div>
      <div className="flex w-full flex-col gap-2">
        <DrawerOpenButton
          isFiltered={isFiltered}
          props={{ onClick: () => setOpen(true), className: "md:hidden" }}
        />
        <ScheduleCalendar {...calendar} groupedSchedules={groupedSchedules} />
        <ScheduleViewer
          selected={calendar.selected}
          groupedSchedules={groupedSchedules}
        />
      </div>

      <FilterDrawer open={open} onOpenChange={setOpen}>
        <Filter
          schedules={schedules}
          filter={filter}
          setFilter={setFilter}
          isFiltered={isFiltered}
        />
      </FilterDrawer>
    </main>
  );
}
