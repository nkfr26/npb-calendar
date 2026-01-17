"use client";

import { MarkGithubIcon } from "@primer/octicons-react";
import Link from "next/link";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "./_components/filter";
import { FilterCard } from "./_components/filter-card";
import { DrawerOpenButton, FilterDrawer } from "./_components/filter-drawer";
import { ScheduleCalendar } from "./_components/schedule-calendar";
import { ScheduleViewer } from "./_components/schedule-viewer";
import { useCalendar } from "./_components/use-calendar";
import {
  filterSchedules,
  groupSchedulesByDate,
  useFilter,
} from "./_components/use-filter";
import { useSchedulesQuery } from "./_components/use-schedules-query";

export default function Home() {
  const calendar = useCalendar();
  const { data: schedules = [] } = useSchedulesQuery(calendar.month);
  const { filter, setFilter, isFiltered } = useFilter();
  const groupedSchedules = groupSchedulesByDate(
    filterSchedules(schedules, filter),
  );

  const [open, setOpen] = useState(false);
  const [isDependent, setIsDependent] = useQueryState(
    "isDependent",
    parseAsBoolean.withDefault(false),
  );
  return (
    <div className="flex h-dvh flex-col text-sm">
      <header className="border-b">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <Link href="/" className="font-mono text-xl">
              npb-calendar
            </Link>
            <Button asChild size="icon">
              <a
                href="https://github.com/nkfr26/npb-calendar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
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
              <Filter
                schedules={schedules}
                filter={filter}
                setFilter={setFilter}
                isFiltered={isFiltered}
                isDependent={isDependent}
                setIsDependent={setIsDependent}
              />
            </FilterCard>
          </div>
          <ScrollArea type="auto" className="flex-1">
            <div className="flex flex-col gap-2 py-4 pr-4">
              <DrawerOpenButton
                isFiltered={isFiltered}
                props={{ onClick: () => setOpen(true), className: "md:hidden" }}
              />
              <ScheduleCalendar
                {...calendar}
                groupedSchedules={groupedSchedules}
              />
              <ScheduleViewer
                selected={calendar.selected}
                groupedSchedules={groupedSchedules}
              />
            </div>
          </ScrollArea>
        </div>
      </main>

      <FilterDrawer open={open} onOpenChange={setOpen}>
        <Filter
          schedules={schedules}
          filter={filter}
          setFilter={setFilter}
          isFiltered={isFiltered}
          isDependent={isDependent}
          setIsDependent={setIsDependent}
        />
      </FilterDrawer>
    </div>
  );
}
