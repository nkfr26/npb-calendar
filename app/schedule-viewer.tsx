import { ChevronDown, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
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
  const [openItems, setOpenItems] = useState<number[]>([]);
  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

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
    <ScrollArea className="min-h-0 rounded-md border p-4 text-sm">
      <div className="space-y-2">
        {Object.keys(displaySchedules).map((key, index) => (
          <Collapsible
            key={key}
            open={openItems.includes(index)}
            onOpenChange={() => toggleItem(index)}
            className="rounded-lg border"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
              <div className="flex flex-col">
                <div className="font-medium">
                  {new Date(key).toLocaleDateString("ja-JP", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  })}
                </div>
                <div className="text-gray-600 text-xs">
                  {displaySchedules[key]?.length || 0}試合
                </div>
              </div>
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${
                  openItems.includes(index) ? "rotate-180 transform" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={displaySchedules[key]?.length ? "border-t" : ""}
            >
              <div className="flex flex-col divide-y">
                {displaySchedules[key]?.map((value) => {
                  const ticket = value.ticket;
                  const resaleUrls = ticket?.resale
                    ? Array.isArray(ticket.resale)
                      ? ticket.resale
                      : [ticket.resale]
                    : undefined;
                  return (
                    <div
                      key={JSON.stringify(value)}
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
                                {resaleUrls.map((resaleUrl, resaleIndex) => (
                                  <DropdownMenuItem
                                    key={resaleUrl}
                                    onClick={() => handleTicketClick(resaleUrl)}
                                  >
                                    <ExternalLink />
                                    {1 < resaleUrls.length
                                      ? `リセール ${resaleIndex + 1}`
                                      : "リセール"}
                                  </DropdownMenuItem>
                                ))}
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      {!ticket && (
                        <Button variant="outline" disabled>
                          <Ticket />
                          チケット
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
