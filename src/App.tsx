import { useQueries } from "@tanstack/react-query";
import { groupBy } from "es-toolkit";
import { useEffect, useState } from "react";

import { DrawerOpenButton } from "@/components/drawer-open-button";
import { Filter } from "@/components/filter";
import { FilterDrawer } from "@/components/filter-drawer";
import { Header } from "@/components/header";
import { ScheduleCalendar } from "@/components/schedule-calendar";
import { ScheduleViewer } from "@/components/schedule-viewer";
import { useCalendar } from "@/hooks/use-calendar";
import { filterSchedules, useFilter } from "@/hooks/use-filter";
import { holidaysQueryOptions, type Holidays } from "@/queries/use-holidays-query";
import { schedulesQueryOptions, type Schedule } from "@/queries/use-schedules-query";

type Calendar = ReturnType<typeof useCalendar>;
type LoadedCalendar = Pick<Calendar, "month" | "selected"> & {
  schedules: Schedule[];
  holidays: Holidays;
};

export function App() {
  const calendar = useCalendar();
  const [{ data: schedules }, { data: holidays }] = useQueries({
    queries: [schedulesQueryOptions(calendar.month), holidaysQueryOptions()],
  });
  const [loaded, setLoaded] = useState<LoadedCalendar>();

  // Commit month, selection, and both datasets together. Keep the last snapshot while fetching.
  if (
    schedules !== undefined &&
    holidays !== undefined &&
    (loaded?.month !== calendar.month ||
      loaded?.selected !== calendar.selected ||
      loaded?.schedules !== schedules ||
      loaded?.holidays !== holidays)
  ) {
    setLoaded({ month: calendar.month, selected: calendar.selected, schedules, holidays });
  }

  if (!loaded) {
    return <output className="flex min-h-svh items-center justify-center">読み込み中…</output>;
  }

  return (
    <ScheduleContent
      calendar={{ ...calendar, month: loaded.month, selected: loaded.selected }}
      schedules={loaded.schedules}
      holidays={loaded.holidays}
    />
  );
}

function ScheduleContent({
  calendar,
  schedules,
  holidays,
}: {
  calendar: Calendar;
  schedules: Schedule[];
  holidays: Holidays;
}) {
  const { filter, setFilter, isFiltered } = useFilter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { onSelect } = calendar;
  const filteredSchedules = filterSchedules(schedules, filter);
  const selected = filteredSchedules.some(
    (schedule) => schedule.date === calendar.selected?.toString(),
  )
    ? calendar.selected
    : undefined;

  useEffect(() => {
    if (calendar.selected && !selected) onSelect(undefined);
  }, [calendar.selected, selected, onSelect]);

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
          <DrawerOpenButton
            className="md:hidden"
            isFiltered={isFiltered}
            onClick={() => setDrawerOpen(true)}
          />
          <ScheduleCalendar
            {...calendar}
            selected={selected}
            holidays={holidays}
            groupedSchedulesByDate={groupedSchedulesByDate}
          />
          <ScheduleViewer
            selected={selected}
            holidays={holidays}
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
      <footer className="border-t border-base-300 bg-base-100 p-4 text-xs text-base-content/60">
        <p className="mx-auto max-w-6xl [word-break:auto-phrase]">
          本サイトは非公式サービスであり、一般社団法人日本野球機構 (NPB)
          および各球団とは関係ありません。試合日程等は公開情報をもとに独自に整理しています。最新情報は公式サイト
          (カレンダー左上) をご確認ください。
        </p>
      </footer>
    </>
  );
}
