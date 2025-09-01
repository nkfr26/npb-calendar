"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Content } from "./content";
import { MainBlock } from "./main-block";
import { ScheduleCalendar } from "./schedule-calendar";
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
      <MainBlock>
        <div className="md:hidden">
          <ScheduleFilterDrawerButtonBlock
            onClick={() => setOpen(true)}
            isFiltered={isFiltered}
          />
        </div>
        <ScheduleCalendar {...calendar} schedules={schedules} />
        <ScheduleDisplay data={displayScheduleData} />
      </MainBlock>
      <ScheduleFilterDrawer open={open} onOpenChange={setOpen}>
        {scheduleFilter}
      </ScheduleFilterDrawer>
    </Content>
  );
}
