"use client";

import { useState } from "react";
import { Content } from "./content";
import { Filter } from "./filter";
import { FilterCard } from "./filter-card";
import { DrawerOpenButton, FilterDrawer } from "./filter-drawer";
import { ScheduleCalendar } from "./schedule-calendar";
import { ScheduleViewer } from "./schedule-viewer";
import { useCalendar } from "./use-calendar";
import { useScheduleManagement } from "./use-schedule-management";

export default function Home() {
  const calendar = useCalendar();
  const { isFiltered, schedules, ...filter } = useScheduleManagement(
    calendar.month,
  );
  const [open, setOpen] = useState(false);
  return (
    <Content>
      <div className="flex h-dvh gap-2 p-6 md:pt-18">
        <div className="hidden md:block">
          <FilterCard>
            <Filter {...filter} />
          </FilterCard>
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
        <FilterDrawer open={open} onOpenChange={setOpen}>
          <Filter {...filter} />
        </FilterDrawer>
      </div>
    </Content>
  );
}
