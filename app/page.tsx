"use client";

import { Funnel } from "lucide-react";
import { useState } from "react";
import { Calendar21 } from "@/components/calendar-21";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { ScheduleFilter } from "./schedule-filter";
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

  const selectedDateSchedule =
    schedules[calendar.selected ? formatDate(calendar.selected) : ""];
  return (
    <div className="max-w-6xl mx-auto h-dvh p-6 pt-18 flex gap-4">
      <Card className="w-xs self-start hidden md:block">
        <CardContent>
          <ScheduleFilter
            teams={teams}
            stadiums={stadiums}
            filter={filter}
            setFilter={setFilter}
            isDependent={isDependent}
            setIsDependent={setIsDependent}
          />
        </CardContent>
      </Card>
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <Calendar21 {...calendar} schedules={schedules} />
        <ScrollArea className="min-h-0 rounded-md border p-4">
          <pre>
            {JSON.stringify(
              calendar.selected
                ? { [formatDate(calendar.selected)]: selectedDateSchedule }
                : schedules,
              null,
              2,
            )}
          </pre>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="fixed bottom-8 left-8">
        <div className="relative md:hidden">
          <Button size="icon" className="size-10" onClick={() => setOpen(true)}>
            <Funnel />
          </Button>
          {isFiltered ? (
            <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 border-2 border-background" />
          ) : null}
        </div>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="sr-only" />
            <DrawerDescription className="sr-only" />
          </DrawerHeader>
          <div className="px-4">
            <ScheduleFilter
              teams={teams}
              stadiums={stadiums}
              filter={filter}
              setFilter={setFilter}
              isDependent={isDependent}
              setIsDependent={setIsDependent}
            />
          </div>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)} autoFocus>
              OK
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
