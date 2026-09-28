import { Drawer as ArkDrawer } from "@ark-ui/react/drawer";
import { Portal } from "@ark-ui/react/portal";
import { cn } from "cn";
import type { ComponentProps } from "react";

export const DrawerRoot = ArkDrawer.Root;
export const DrawerPortal = Portal;

export function DrawerTitle({ className, ...props }: ComponentProps<typeof ArkDrawer.Title>) {
  return <ArkDrawer.Title {...props} className={cn("sr-only", className)} />;
}

export function DrawerDescription({
  className,
  ...props
}: ComponentProps<typeof ArkDrawer.Description>) {
  return <ArkDrawer.Description {...props} className={cn("sr-only", className)} />;
}

export function DrawerBackdrop({ className, ...props }: ComponentProps<typeof ArkDrawer.Backdrop>) {
  return (
    <ArkDrawer.Backdrop {...props} className={cn("fixed inset-0 z-50 bg-black/50", className)} />
  );
}

export function DrawerPositioner({
  className,
  ...props
}: ComponentProps<typeof ArkDrawer.Positioner>) {
  return (
    <ArkDrawer.Positioner
      {...props}
      className={cn("fixed inset-0 z-[calc(infinity)] flex items-end", className)}
    />
  );
}

export function DrawerContent({
  className,
  children,
  ...props
}: ComponentProps<typeof ArkDrawer.Content>) {
  return (
    <ArkDrawer.Content {...props} className={cn("w-full rounded-t-box bg-base-100", className)}>
      <ArkDrawer.Grabber className="flex justify-center pt-4">
        <ArkDrawer.GrabberIndicator className="h-1.5 w-25 rounded-full bg-base-300" />
      </ArkDrawer.Grabber>
      {children}
    </ArkDrawer.Content>
  );
}

export function DrawerCloseTrigger({
  className,
  ...props
}: ComponentProps<typeof ArkDrawer.CloseTrigger>) {
  return <ArkDrawer.CloseTrigger {...props} className={cn("btn w-full btn-primary", className)} />;
}
