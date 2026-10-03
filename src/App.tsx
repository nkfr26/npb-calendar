import { groupBy } from "es-toolkit";
import { lazy, Suspense, useState } from "react";

import { DrawerOpenButton } from "@/components/drawer-open-button";
import { Filter } from "@/components/filter";
import { Header } from "@/components/header";
import { ScheduleCalendar } from "@/components/schedule-calendar";
import { ScheduleViewer } from "@/components/schedule-viewer";
import { useCalendar } from "@/hooks/use-calendar";
import { filterSchedules, useFilter } from "@/hooks/use-filter";
import { formatDate } from "@/lib/utils";
import { useSchedulesQuery } from "@/queries/use-schedules-query";

const FilterDrawer = lazy(() =>
  import("@/components/filter-drawer").then(({ FilterDrawer }) => ({ default: FilterDrawer })),
);

export function App() {
  const calendar = useCalendar();
  const { data: schedules = [], isSuccess } = useSchedulesQuery(calendar.month);
  const { filter, setFilter, isFiltered } = useFilter();
  const [drawerOpen, setDrawerOpen] = useState<boolean>();

  const selected = calendar.selected;
  const filteredSchedules = filterSchedules(schedules, filter);
  if (
    isSuccess &&
    selected &&
    !filteredSchedules.some((schedule) => schedule.date === formatDate(selected))
  ) {
    calendar.onSelect(undefined);
  }
  const groupedSchedulesByDate = groupBy(filteredSchedules, (schedule) => schedule.date);
  return (
    <>
      <Header />
      <main className="mx-auto flex h-full w-full max-w-6xl gap-4 p-4">
        <aside className="hidden md:block">
          <div className="card sticky top-18 w-xs border border-base-300 bg-base-100">
            <div className="card-body">
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
          <ScheduleViewer selected={selected} groupedSchedulesByDate={groupedSchedulesByDate} />
        </div>

        {drawerOpen !== undefined && (
          <Suspense>
            <FilterDrawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <Filter
                schedules={schedules}
                filter={filter}
                setFilter={setFilter}
                isFiltered={isFiltered}
              />
            </FilterDrawer>
          </Suspense>
        )}
      </main>
      <footer className="border-t border-base-300 bg-base-100 p-4 text-xs leading-relaxed text-base-content/50">
        <p className="mx-auto max-w-6xl [word-break:auto-phrase]">
          本サイトは非公式サービスであり、一般社団法人日本野球機構 (NPB)
          および各球団とは関係ありません。試合日程等は公開情報をもとに独自に整理しています。最新情報は公式サイト
          (カレンダー左上) をご確認ください。
        </p>
      </footer>
    </>
  );
}
