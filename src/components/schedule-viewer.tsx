import { Collapsible } from "@ark-ui/react/collapsible";
import { Menu } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import { cn } from "cn";
import { ChevronDown, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { useHolidaysQuery } from "@/queries/use-holidays-query";
import type { GroupedSchedulesByDate } from "@/queries/use-schedules-query";

export function ScheduleViewer({
  selected,
  groupedSchedulesByDate,
}: {
  selected: Date | undefined;
  groupedSchedulesByDate: GroupedSchedulesByDate;
}) {
  const { data: holidays = {} } = useHolidaysQuery();
  const displaySchedules = selected
    ? {
        [formatDate(selected)]:
          groupedSchedulesByDate[formatDate(selected)] ?? [],
      }
    : groupedSchedulesByDate;

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(displaySchedules).map(([dateString, schedules]) => {
        const date = new Date(`${dateString}T00:00:00`);
        const holiday = holidays[dateString];
        const textColor =
          date.getDay() === 6
            ? "text-blue-700 dark:text-blue-400"
            : date.getDay() === 0 || holiday
              ? "text-red-600 dark:text-red-400"
              : undefined;

        return (
          <Collapsible.Root
            key={dateString}
            className="group overflow-clip rounded-lg border border-base-300 bg-base-100"
          >
            <Collapsible.Trigger className="sticky top-14 z-10 flex w-full items-center justify-between bg-base-100 p-4 text-left hover:bg-base-200">
              <div className="flex flex-col">
                <div
                  className={cn(
                    "flex items-center gap-1 font-medium",
                    textColor,
                  )}
                >
                  {date.toLocaleDateString("ja-JP", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  })}
                  {holiday && <span className="text-xs">{holiday}</span>}
                </div>
                <div className="text-xs opacity-60">{schedules.length}試合</div>
              </div>
              <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Collapsible.Trigger>
            <Collapsible.Content
              className={cn(schedules.length && "border-t border-base-300")}
            >
              <div className="flex flex-col divide-y divide-base-300">
                {schedules.map((schedule) => (
                  <ScheduleRow
                    key={`${dateString}-${schedule.match.home}`}
                    schedule={schedule}
                  />
                ))}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        );
      })}
    </div>
  );
}

function ScheduleRow({
  schedule,
}: {
  schedule: GroupedSchedulesByDate[string][number];
}) {
  const ticket = schedule.ticket;
  const resaleUrls = ticket?.resale
    ? Array.isArray(ticket.resale)
      ? ticket.resale
      : [ticket.resale]
    : [];

  return (
    <div className="flex justify-between gap-3 p-4">
      <div className="flex flex-col justify-center gap-1">
        <div className="font-medium">
          {schedule.match.home} <span className="text-xs font-normal">対</span>{" "}
          {schedule.match.visitor}
        </div>
        {(schedule.info.time || schedule.info.stadium) && (
          <div className="flex flex-wrap gap-2 text-xs opacity-60">
            {schedule.info.time && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {schedule.info.time}
              </span>
            )}
            {schedule.info.stadium && (
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {schedule.info.stadium}
              </span>
            )}
          </div>
        )}
      </div>
      {ticket && (
        <Menu.Root positioning={{ placement: "bottom-end" }}>
          <Menu.Trigger className="btn btn-square btn-primary md:h-auto md:w-auto md:px-4">
            <Ticket className="size-4" />
            <span className="hidden md:inline">チケット</span>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner className="!z-[60]">
              <Menu.Content className="min-w-48 rounded-box border border-base-300 bg-base-100 p-1 shadow-xl">
                <TicketItem href={ticket.primary}>購入</TicketItem>
                {resaleUrls.length > 0 && (
                  <div className="my-1 border-t border-base-300" />
                )}
                {resaleUrls.map((url, index) => (
                  <TicketItem key={url} href={url}>
                    {resaleUrls.length === 1
                      ? "リセール"
                      : `リセール ${index + 1}`}
                  </TicketItem>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </div>
  );
}

function TicketItem({ href, children }: { href: string; children: string }) {
  return (
    <Menu.Item
      value={href}
      asChild
      className="flex w-full items-center gap-2 rounded-field px-3 py-2 text-sm hover:bg-base-200 focus:bg-base-200"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalLink className="ml-auto size-4" />
      </a>
    </Menu.Item>
  );
}
