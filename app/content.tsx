import type { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl">{children}</div>;
}
