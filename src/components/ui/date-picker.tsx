import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import type { ComponentProps } from "react";

export const DatePickerContent = ArkDatePicker.Content;
export const DatePickerContext = ArkDatePicker.Context;
export const DatePickerView = ArkDatePicker.View;
export const DatePickerTableHead = ArkDatePicker.TableHead;
export const DatePickerTableRow = ArkDatePicker.TableRow;
export const DatePickerTableBody = ArkDatePicker.TableBody;
export const DatePickerTableCell = ArkDatePicker.TableCell;

export function DatePickerRoot({ className, ...props }: ComponentProps<typeof ArkDatePicker.Root>) {
  return (
    <ArkDatePicker.Root
      {...props}
      className={cn("rounded-box border border-base-300 bg-base-100 p-3", className)}
    />
  );
}

export function DatePickerViewControl({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.ViewControl>) {
  return (
    <ArkDatePicker.ViewControl
      {...props}
      className={cn("grid grid-cols-[1fr_auto_1fr] items-center", className)}
    />
  );
}

export function DatePickerRangeText({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.RangeText>) {
  return <ArkDatePicker.RangeText {...props} className={cn("font-semibold", className)} />;
}

export function DatePickerPrevTrigger({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.PrevTrigger>) {
  return (
    <ArkDatePicker.PrevTrigger
      {...props}
      className={cn("btn btn-square btn-ghost btn-sm", className)}
    />
  );
}

export function DatePickerNextTrigger({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.NextTrigger>) {
  return (
    <ArkDatePicker.NextTrigger
      {...props}
      className={cn("btn btn-square btn-ghost btn-sm", className)}
    />
  );
}

export function DatePickerTable({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.Table>) {
  return (
    <ArkDatePicker.Table
      {...props}
      className={cn("w-full table-fixed border-separate border-spacing-1", className)}
    />
  );
}

export function DatePickerTableHeader({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.TableHeader>) {
  return (
    <ArkDatePicker.TableHeader
      {...props}
      className={cn("h-8 text-xs font-normal opacity-60", className)}
    />
  );
}

export function DatePickerTableCellTrigger({
  className,
  ...props
}: ComponentProps<typeof ArkDatePicker.TableCellTrigger>) {
  return (
    <ArkDatePicker.TableCellTrigger
      {...props}
      className={cn(
        "btn h-11 w-full flex-col gap-1 btn-ghost p-0 text-xs transition-none",
        "data-[selected]:border-2 data-[selected]:border-primary/60 data-[selected]:bg-transparent dark:data-[selected]:border-primary/80",
        className,
      )}
    />
  );
}
