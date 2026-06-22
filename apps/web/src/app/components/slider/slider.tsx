"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValue?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  function SliderInner(
    {
      className,
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      showValue = false,
      onChange,
      ...props
    }: SliderProps,
    ref: React.Ref<HTMLInputElement>,
  ) {
    const [internal, setInternal] = React.useState(Number(defaultValue));
    const current = typeof value === "number" ? value : internal;

    const percent =
      ((Number(current) - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className="w-full space-y-3">
        <div className="relative flex items-center w-full h-5">
         
          <div className="absolute w-full h-1.5 rounded-full bg-neutral-700/60" />

        
          <div
            className="absolute h-1.5 rounded-full bg-white"
            style={{ width: `${percent}%` }}
          />

          
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            value={current}
            onChange={(event) => {
              if (typeof value !== "number") setInternal(Number(event.target.value));
              onChange?.(event);
            }}
            className={cn(
              "absolute w-full h-full cursor-pointer appearance-none bg-transparent",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:h-4",
              "[&::-webkit-slider-thumb]:w-4",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-white",
              "[&::-webkit-slider-thumb]:border-0",
              "[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(0,0,0,0.4)]",
              "[&::-webkit-slider-thumb]:transition-transform",
              "[&::-webkit-slider-thumb]:duration-100",
              "[&::-webkit-slider-thumb]:hover:scale-110",
              "[&::-moz-range-thumb]:appearance-none",
              "[&::-moz-range-thumb]:h-4",
              "[&::-moz-range-thumb]:w-4",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-white",
              "[&::-moz-range-thumb]:border-0",
              "[&::-moz-range-thumb]:shadow-[0_0_0_3px_rgba(0,0,0,0.4)]",
              "[&:focus-visible::-webkit-slider-thumb]:ring-2",
              "[&:focus-visible::-webkit-slider-thumb]:ring-white",
              "[&:focus-visible::-webkit-slider-thumb]:ring-offset-2",
              "[&:focus-visible::-webkit-slider-thumb]:ring-offset-black",
              "focus-visible:outline-none",
              className,
            )}
            {...props}
          />
        </div>

        {showValue ? (
          <p className="text-xs text-muted-foreground">Value: {current}</p>
        ) : null}
      </div>
    );
  },
);

Slider.displayName = "Slider";