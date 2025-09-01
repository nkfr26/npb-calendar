import type { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto h-dvh p-6 md:pt-18 flex gap-2">
      {children}
    </div>
  );
}
