import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function FilterCard({ children }: { children: ReactNode }) {
  return (
    <Card className="w-xs self-start shadow-none">
      <CardContent>{children}</CardContent>
    </Card>
  );
}
