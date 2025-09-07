import { ChevronDown, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const handleTicketClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="flex flex-col gap-2">
      {Object.keys(displaySchedules).map((dateString) => (
        <Collapsible
          key={dateString}
          className="group overflow-clip rounded-lg border"
        >
          <CollapsibleTrigger className="sticky top-0 flex w-full items-center justify-between bg-background p-4 text-left hover:bg-accent">
            <div className="flex flex-col">
              <div className="font-medium">
                {new Date(dateString).toLocaleDateString("ja-JP", {
                  month: "long",
                  day: "numeric",
                  weekday: "short",
                })}
              </div>
              <div className="text-gray-600 text-xs">
                {displaySchedules[dateString]?.length || 0}試合
              </div>
            </div>
            <ChevronDown
              className={
                "size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
              }
            />
          </CollapsibleTrigger>
          <CollapsibleContent
            className={displaySchedules[dateString]?.length ? "border-t" : ""}
          >
            <div className="flex flex-col divide-y">
              {displaySchedules[dateString]?.map((value) => {
                const ticket = value.ticket;
                const resaleUrls = ticket?.resale
                  ? Array.isArray(ticket.resale)
                    ? ticket.resale
                    : [ticket.resale]
                  : undefined;
                return (
                  <div
                    key={dateString + value.match.home}
                    className="flex justify-between p-4"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">
                        {value.match.home}{" "}
                        <span className="font-normal text-xs">対</span>{" "}
                        {value.match.visitor}
                      </div>
                      <div className="flex gap-2 text-gray-600 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{value.info.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{value.info.stadium}</span>
                        </div>
                      </div>
                    </div>
                    {ticket && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Ticket />
                            <span className="hidden md:block">チケット</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleTicketClick(ticket.primary)}
                          >
                            <ExternalLink />
                            購入
                          </DropdownMenuItem>
                          {resaleUrls && (
                            <>
                              <DropdownMenuSeparator />
                              {resaleUrls.map((resaleUrl, index) => (
                                <DropdownMenuItem
                                  key={resaleUrl}
                                  onClick={() => handleTicketClick(resaleUrl)}
                                >
                                  <ExternalLink />
                                  {resaleUrls.length === 1
                                    ? "リセール"
                                    : `リセール ${index + 1}`}
                                </DropdownMenuItem>
                              ))}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
