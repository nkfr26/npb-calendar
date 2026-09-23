import { Drawer } from "@ark-ui/react/drawer";
import { Portal } from "@ark-ui/react/portal";
import { cn } from "cn";
import { Funnel } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

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
    <Drawer.Root
      open={open}
      onOpenChange={({ open }) => onOpenChange(open)}
      swipeDirection="down"
    >
      <Portal>
        <Drawer.Backdrop className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Positioner className="fixed inset-0 z-50 flex items-end">
          <Drawer.Content className="max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-base-100 shadow-xl">
            <Drawer.Title className="sr-only">絞り込み</Drawer.Title>
            <Drawer.Description className="sr-only">
              表示する試合を条件で絞り込みます
            </Drawer.Description>
            <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-base-300" />
            <div className="p-4">{children}</div>
            <div className="p-4 pt-0">
              <Drawer.CloseTrigger className="btn w-full btn-primary">
                OK
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

export function DrawerOpenButton({
  isFiltered,
  className,
  ...props
}: ComponentProps<"button"> & { isFiltered: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "btn indicator w-full border-base-300 btn-outline md:hidden",
        className,
      )}
      {...props}
    >
      <Funnel className="size-4" /> 絞り込み
      {isFiltered && (
        <span className="indicator-item badge size-4 p-0 badge-primary" />
      )}
    </button>
  );
}
