import { Card, CardContent } from "@/components/ui/card";

export function FilterCard({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props} className={`w-xs shadow-none ${props.className}`}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
