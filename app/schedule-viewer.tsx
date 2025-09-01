import Linkify from "linkify-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import type { GroupedSchedules } from "./use-schedule-management";

export function ScheduleViewer({
  schedules,
  selected,
}: {
  schedules: GroupedSchedules;
  selected: Date | undefined;
}) {
  // 日付未選択時はすべてのスケジュールを表示
  const displaySchedules = selected
    ? {
        [formatDate(selected)]: schedules[formatDate(selected)],
      }
    : schedules;
  return (
    <ScrollArea className="min-h-0 rounded-md border p-4 text-sm">
      <pre>
        <Linkify
          options={{
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "text-[#0000EE] underline active:text-[#FF0000] visited:text-[#551A8B]",
          }}
        >
          {JSON.stringify(displaySchedules, null, 2)}
        </Linkify>
      </pre>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
