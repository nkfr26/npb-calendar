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
    <ArkDrawer.Backdrop
      {...props}
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "data-swiping:[transition-duration:0s] starting:data-[state=open]:opacity-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=closed]:duration-400 data-[state=closed]:data-swiping:[animation-duration:calc(var(--drawer-swipe-strength)*400ms)]",
        className,
      )}
    />
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
    <ArkDrawer.Content
      {...props}
      className={cn(
        "relative w-full rounded-t-box bg-base-100",
        "transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]",
        // Starting styles avoid replaying the entrance after a swipe; Ark sets transform inline.
        "starting:data-[state=open]:transform-[translateY(calc(100%+2px))]!",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-[calc(100%+2px)]",
        "data-[state=closed]:duration-400 data-[state=closed]:data-swiping:[animation-duration:calc(var(--drawer-swipe-strength)*400ms)]",
        "[--bleed:3rem] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-(--bleed) after:bg-(--drawer-bleed-background,var(--color-base-100))",
        className,
      )}
    >
      <ArkDrawer.Grabber className="flex justify-center pt-3">
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
