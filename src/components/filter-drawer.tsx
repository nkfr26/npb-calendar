import type { ReactNode } from "react";

import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerPortal,
  DrawerPositioner,
  DrawerRoot,
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
    <DrawerRoot
      open={open}
      onOpenChange={({ open }) => onOpenChange(open)}
      onPointerDownOutside={(event) => {
        if (
          document.querySelector('[data-scope="select"][data-part="content"][data-state="open"]')
        ) {
          event.preventDefault();
        }
      }}
      swipeDirection="down"
      unmountOnExit
    >
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerTitle>絞り込み</DrawerTitle>
            <DrawerDescription>表示する試合を条件で絞り込みます</DrawerDescription>
            <div className="flex flex-col gap-4 p-4">
              {children}
              <DrawerCloseTrigger>OK</DrawerCloseTrigger>
            </div>
          </DrawerContent>
        </DrawerPositioner>
      </DrawerPortal>
    </DrawerRoot>
  );
}
