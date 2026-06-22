"use client";

import * as React from "react";
import { Slider } from "./slider";

export function SliderDefaultView() {
  const [volume, setVolume] = React.useState(64);

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-100">Volume</p>
        <span className="text-xs font-medium tabular-nums text-neutral-400">
          {volume}
        </span>
      </div>
      <Slider
        value={volume}
        min={0}
        max={100}
        onChange={(event) => setVolume(Number(event.target.value))}
      />
    </div>
  );
}

export default SliderDefaultView;