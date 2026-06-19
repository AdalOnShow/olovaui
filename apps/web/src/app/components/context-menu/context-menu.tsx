"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative inline-flex flex-col", className)}
      {...props}
    />
  )
);
ContextMenu.displayName = "ContextMenu";

export function ContextMenuTrigger({
  className,
  open,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
       
        "cursor-pointer inline-flex h-8 w-fit items-center gap-2 px-3 rounded-md text-sm font-medium",
        "bg-neutral-900 border border-neutral-700/60",
        "text-neutral-100",
        "shadow-sm shadow-black/20",
        "hover:bg-neutral-800 hover:border-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "transition-all duration-150",
        className
      )}
      {...props}
    >
      <span>Actions</span>
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform duration-300",
          open && "rotate-180"
        )}
      />
    </button>
  );
}

export function ContextMenuContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-40  rounded-md border border-neutral-700/60 bg-neutral-900 p-1 text-popover-foreground shadow-xl shadow-black/30",
        className
      )}
      {...props}
    />
  );
}

export function ContextMenuItem({
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center rounded-md px-2.5 py-1.5 text-sm",
       
        "text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100",
        "transition-colors duration-100",
        "focus-visible:outline-none focus-visible:bg-neutral-800",
       
        disabled && "text-neutral-600 cursor-not-allowed hover:bg-transparent hover:text-neutral-600",
        className
      )}
      {...props}
    />
  );
}