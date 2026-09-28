import { groupBy } from "es-toolkit";
import { useState } from "react";

import { Filter } from "@/components/filter";
import { DrawerOpenButton, FilterDrawer } from "@/components/filter-drawer";
import { Header } from "@/components/header";
import { ScheduleCalendar } from "@/components/schedule-calendar";
import { ScheduleViewer } from "@/components/schedule-viewer";
import { useCalendar } from "@/hooks/use-calendar";
import { filterSchedules, useFilter } from "@/hooks/use-filter";
import { useSchedulesQuery } from "@/queries/use-schedules-query";

export function App() {
  const calendar = useCalendar();
  const { data: schedules = [] } = useSchedulesQuery(calendar.month);
  const { filter, setFilter, isFiltered } = useFilter();
  const groupedSchedulesByDate = groupBy(
    filterSchedules(schedules, filter),
    (schedule) => schedule.date,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="mx-auto flex h-full w-full max-w-6xl gap-4 p-4">
        <aside className="hidden md:block">
          <div className="card sticky top-18 w-xs border border-base-300 bg-base-100">
            <div className="card-body p-6">
              <Filter
                schedules={schedules}
                filter={filter}
                setFilter={setFilter}
                isFiltered={isFiltered}
              />
            </div>
          </div>
        </aside>

        <div className="flex w-full min-w-0 flex-col gap-2">
          <DrawerOpenButton isFiltered={isFiltered} onClick={() => setDrawerOpen(true)} />
          <ScheduleCalendar {...calendar} groupedSchedulesByDate={groupedSchedulesByDate} />
          <ScheduleViewer
            selected={calendar.selected}
            groupedSchedulesByDate={groupedSchedulesByDate}
          />
        </div>

        <FilterDrawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <Filter
            schedules={schedules}
            filter={filter}
            setFilter={setFilter}
            isFiltered={isFiltered}
          />
        </FilterDrawer>
      </main>
    </>
  );
}
