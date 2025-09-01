"use client";

import { useState } from "react";
import { Calendar21 } from "@/components/calendar-21";
import { formatDate } from "@/lib/utils";
import { CalendarSchedule } from "./calendar-schedule";
import { Content } from "./content";
import { ScheduleDisplay } from "./schedule-display";
import { ScheduleFilter } from "./schedule-filter";
import { ScheduleFilterCard } from "./schedule-filter-card";
import {
  ScheduleFilterDrawer,
  ScheduleFilterDrawerButtonBlock,
} from "./schedule-filter-drawer";
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

  // 日付未選択時はすべてのスケジュールを表示
  const displayScheduleData = calendar.selected
    ? {
        [formatDate(calendar.selected)]:
          schedules[formatDate(calendar.selected)],
      }
    : schedules;
  return (
    <Content>
      <div className="hidden md:block">
        <ScheduleFilterCard>{scheduleFilter}</ScheduleFilterCard>
      </div>
      <CalendarSchedule>
        <div className="md:hidden">
          <ScheduleFilterDrawerButtonBlock
            onClick={() => setOpen(true)}
            isFiltered={isFiltered}
          />
        </div>
        <Calendar21 {...calendar} schedules={schedules} />
        <ScheduleDisplay data={displayScheduleData} />
      </CalendarSchedule>
      <ScheduleFilterDrawer open={open} onOpenChange={setOpen}>
        {scheduleFilter}
      </ScheduleFilterDrawer>
    </Content>
  );
}
