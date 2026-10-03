import { cn } from "cn";
import { Clock, ExternalLink, MapPin, Ticket } from "lucide-react";
import { useEffect, useId } from "react";

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
  useEffect(() => {
    const closeTicketPopover = () =>
      document.querySelector<HTMLElement>(".ticket-popover:popover-open")?.hidePopover();

    window.addEventListener("scroll", closeTicketPopover, true);
    return () => window.removeEventListener("scroll", closeTicketPopover, true);
  }, []);

  const displaySchedules = selected
    ? { [formatDate(selected)]: groupedSchedulesByDate[formatDate(selected)] ?? [] }
    : groupedSchedulesByDate;

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(displaySchedules).map(([dateString, schedules]) => {
        const date = new Date(`${dateString}T00:00:00`);
        const holiday = holidays[dateString];
        const textColor =
          date.getDay() === 0 || holiday
            ? "text-red-600 dark:text-red-400"
            : date.getDay() === 6
              ? "text-blue-600 dark:text-blue-400"
              : undefined;

        return (
          <details
            key={dateString}
            className="collapse-arrow collapse overflow-clip border border-base-300 bg-base-100"
          >
            <summary
              className="collapse-title sticky top-14 z-50 bg-base-100 ring-1 ring-base-300 hover:bg-base-content/10"
              aria-labelledby={`schedule-${dateString}`}
            >
              <div id={`schedule-${dateString}`} className="flex flex-col">
                <div className={cn("flex items-center gap-1 font-medium", textColor)}>
                  {date.toLocaleDateString("ja-JP", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  })}
                  {holiday && <span className="text-xs">{holiday}</span>}
                </div>
                <div className="text-xs opacity-60">{schedules.length}試合</div>
              </div>
            </summary>
            <div className="collapse-content divide-y divide-base-300 border-base-300 p-0 not-empty:border-t">
              {schedules.map((schedule) => (
                <ScheduleRow key={`${dateString}-${schedule.match.home}`} schedule={schedule} />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function ScheduleRow({ schedule }: { schedule: GroupedSchedulesByDate[string][number] }) {
  const menuId = useId();
  const ticket = schedule.ticket;
  const resaleUrls = ticket?.resale
    ? Array.isArray(ticket.resale)
      ? ticket.resale
      : [ticket.resale]
    : [];

  return (
    <div className="flex justify-between p-4">
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
        <>
          <button
            type="button"
            className="btn btn-primary max-md:btn-square"
            aria-label="チケット"
            popoverTarget={menuId}
          >
            <Ticket className="size-4" />
            <span className="hidden md:inline">チケット</span>
          </button>
          <ul
            id={menuId}
            popover="auto"
            className="ticket-popover menu dropdown dropdown-end mt-2 min-w-48 rounded-field border border-base-content/20 bg-base-100 p-2 [position-try-fallbacks:flip-block]"
          >
            <TicketItem href={ticket.primary}>購入</TicketItem>
            {resaleUrls.map((url, index) => (
              <TicketItem key={url} href={url}>
                {resaleUrls.length === 1 ? "リセール" : `リセール ${index + 1}`}
              </TicketItem>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function TicketItem({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalLink className="ml-auto size-4" />
      </a>
    </li>
  );
}
