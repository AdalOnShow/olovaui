"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function PopoverDefaultView() {
  const [open, setOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <Popover ref={popoverRef}>
      <PopoverTrigger onClick={() => setOpen((o) => !o)}>
        Open popover
      </PopoverTrigger>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-2 flex flex-col gap-2">

            <PopoverContent>
              <p className="text-sm font-medium">Quick settings</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Adjust notifications and preferences.
              </p>
            </PopoverContent>

            <PopoverContent>
              <p className="text-sm font-medium">Account</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your profile and security settings.
              </p>
            </PopoverContent>

            <PopoverContent>
              <p className="text-sm font-medium">Help & Support</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Get assistance and find answers to your questions.
              </p>
            </PopoverContent>

          </div>
        </div>
      </div>
    </Popover>
  );
}

export default PopoverDefaultView;