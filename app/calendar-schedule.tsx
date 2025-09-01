import type { ReactNode } from "react";

export function CalendarSchedule({ children }: { children: ReactNode }) {
  return <div className="flex-1 flex flex-col gap-2 min-w-0">{children}</div>;
}
