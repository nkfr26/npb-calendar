import { Funnel } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export function FilterDrawer({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="sr-only" />
          <DrawerDescription className="sr-only" />
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter>
          <Button onClick={() => onOpenChange(false)} autoFocus>
            OK
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerOpenButton({
  onClick,
  isFiltered,
}: {
  onClick: () => void;
  isFiltered: boolean;
}) {
  return (
    <Button className="relative" onClick={onClick}>
      <Funnel /> 絞り込み
      {isFiltered && (
        <Badge className="-top-2 -right-2 absolute h-4 w-4 rounded-full border-2 border-background p-0" />
      )}
    </Button>
  );
}
