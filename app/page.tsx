"use client";

import { useState } from "react";
import { Content } from "./content";
import { ScheduleCalendar } from "./schedule-calendar";
import { ScheduleFilter } from "./schedule-filter";
import { ScheduleFilterCard } from "./schedule-filter-card";
import {
  DrawerOpenButton,
  ScheduleFilterDrawer,
} from "./schedule-filter-drawer";
import { ScheduleViewer } from "./schedule-viewer";
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
    isFiltered,
  } = useScheduleManagement(calendar.month);
  const [open, setOpen] = useState(false);

  const scheduleFilter = (
    <ScheduleFilter
      teams={teams}
      stadiums={stadiums}
      filter={filter}
      setFilter={setFilter}
      isDependent={isDependent}
      setIsDependent={setIsDependent}
    />
  );
  return (
    <Content>
      <div className="flex h-dvh gap-2 p-6 md:pt-18">
        <div className="hidden md:block">
          <ScheduleFilterCard>{scheduleFilter}</ScheduleFilterCard>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex justify-end md:hidden">
            <DrawerOpenButton
              onClick={() => setOpen(true)}
              isFiltered={isFiltered}
            />
          </div>
          <ScheduleCalendar {...calendar} schedules={schedules} />
          <ScheduleViewer schedules={schedules} selected={calendar.selected} />
        </div>
        <ScheduleFilterDrawer open={open} onOpenChange={setOpen}>
          {scheduleFilter}
        </ScheduleFilterDrawer>
      </div>
    </Content>
  );
}
