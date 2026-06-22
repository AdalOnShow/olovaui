"use client";

import * as React from "react";
import ReactDOM from "react-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenuInner(
    { className, ...props }: DropdownMenuProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    return (
      <div
        ref={ref}
        className={cn("relative inline-flex flex-col", className)}
        {...props}
      />
    );
  },
);
DropdownMenu.displayName = "DropdownMenu";

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean }
>(function DropdownMenuTrigger({ className, open, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "cursor-pointer inline-flex h-8 w-fit items-center gap-2 px-3 rounded-md text-sm font-medium",
        "bg-neutral-900 border border-neutral-700/60 text-neutral-100",
        "shadow-sm shadow-black/20",
        "hover:bg-neutral-800 hover:border-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "transition-all duration-150",
        className,
      )}
      {...props}
    >
      <span>Actions</span>
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform duration-300",
          open && "rotate-180",
        )}
      />
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  anchorRef?: React.RefObject<HTMLElement>;
}

export function DropdownMenuContent({
  className,
  anchorRef,
  style,
  ...props
}: DropdownMenuContentProps) {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useLayoutEffect(() => {
    if (!anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
  }, [anchorRef]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 9999,
        ...style,
      }}
      className={cn(
        "w-40 rounded-md border border-neutral-700/60 bg-neutral-900 p-1 text-popover-foreground shadow-xl shadow-black/30",
        className,
      )}
      {...props}
    />,
    document.body,
  );
}

export function DropdownMenuItem({
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center rounded-md px-2.5 py-1.5 text-sm text-neutral-200",
        "hover:bg-neutral-800 hover:text-neutral-100",
        "transition-colors duration-100",
        "focus-visible:outline-none focus-visible:bg-neutral-800",
        disabled &&
          "text-neutral-600 cursor-not-allowed hover:bg-transparent hover:text-neutral-600",
        className,
      )}
      {...props}
    />
  );
}
