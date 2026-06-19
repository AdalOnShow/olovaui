"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative inline-flex flex-col", className)} {...props} />
  )
);
Popover.displayName = "Popover";

export function PopoverTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer inline-flex h-10 items-center rounded-md border px-3 text-sm",
        className
      )}
      {...props}
    />
  );
}

export function PopoverContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-lg",
        className
      )}
      {...props}
    />
  );
}