"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="flex h-dvh flex-col text-sm">
      <header className="border-b">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="font-mono text-xl">npb-calendar</div>
            <div className="md:hidden">
              <DrawerOpenButton
                onClick={() => setOpen(true)}
                isFiltered={isFiltered}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="overflow-auto [scrollbar-gutter:stable]">
        <div className="mx-auto flex h-full max-w-6xl gap-4 pl-4">
          <div className="hidden pt-4 md:block">
            <FilterCard>
              <Filter {...filter} />
            </FilterCard>
          </div>
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col gap-4 py-4">
              <ScheduleCalendar {...calendar} schedules={schedules} />
              <ScheduleViewer
                schedules={schedules}
                selected={calendar.selected}
              />
            </div>
          </ScrollArea>
        </div>
      </main>

      <FilterDrawer open={open} onOpenChange={setOpen}>
        <Filter {...filter} />
      </FilterDrawer>
    </div>
  );
}
