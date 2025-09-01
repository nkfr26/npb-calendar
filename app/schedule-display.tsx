import Linkify from "linkify-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { GroupedSchedules } from "./use-schedule-management";

export function ScheduleViewer({ schedules }: { schedules: GroupedSchedules }) {
  return (
    <ScrollArea className="min-h-0 text-sm rounded-md border p-4">
      <pre>
        <Linkify
          options={{
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "text-[#0000EE] underline active:text-[#FF0000] visited:text-[#551A8B]",
          }}
        >
          {JSON.stringify(schedules, null, 2)}
        </Linkify>
      </pre>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
