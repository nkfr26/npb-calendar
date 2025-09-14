"use client";

import { MarkGithubIcon } from "@primer/octicons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "./filter";
import { FilterCard } from "./filter-card";
import { DrawerOpenButton, FilterDrawer } from "./filter-drawer";
import { ScheduleCalendar } from "./schedule-calendar";
import { ScheduleViewer } from "./schedule-viewer";
import { useCalendar } from "./use-calendar";
import { useHolidays } from "./use-holidays";
import { useScheduleManagement } from "./use-schedule-management";

export default function Home() {
  const calendar = useCalendar();
  const { holidays } = useHolidays();
  const { schedules, ...filter } = useScheduleManagement(calendar.month);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-dvh flex-col text-sm">
      <header className="border-b">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="font-mono text-xl">npb-calendar</div>
            <Button asChild size="icon">
              <a
                href="https://github.com/nkfr26/npb-calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-auto"
              >
                <MarkGithubIcon />
              </a>
            </Button>
          </div>
        </div>
      </header>
      <main className="overflow-auto">
        <div className="mx-auto flex h-full max-w-6xl gap-4 pl-4">
          <div className="hidden pt-4 md:block">
            <FilterCard>
              <Filter {...filter} />
            </FilterCard>
          </div>
          <ScrollArea type="auto" className="flex-1">
            <div className="flex flex-col gap-2 py-4 pr-4">
              <DrawerOpenButton
                onClick={() => setOpen(true)}
                isFiltered={filter.isFiltered}
              />
              <ScheduleCalendar
                {...calendar}
                holidays={holidays}
                schedules={schedules}
              />
              <ScheduleViewer
                selected={calendar.selected}
                holidays={holidays}
                schedules={schedules}
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
