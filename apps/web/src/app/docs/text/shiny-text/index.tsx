"use client";

import { type ReactNode } from "react";
import ShinyText from "./shiny-text";

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-neutral-200/60 bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-600 dark:border-neutral-700/60 dark:bg-neutral-800 dark:text-neutral-400 sm:px-3 sm:py-1">
      {label}
    </span>
  );
}

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900 sm:gap-5 sm:rounded-3xl sm:p-10">
      <Badge label={label} />
      <div className="text-center text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl md:text-3xl">
        {children}
      </div>
    </div>
  );
}

const DEMOS = [
  {
    label: "Slow (Default)",
    props: { text: "Shining slowly" },
  },
  {
    label: "Fast & Gold",
    props: {
      text: "Premium Unlock",
      speed: 1.2,
      color: "#b48600",
      shineColor: "#ffe566",
    },
  },
  {
    label: "Yoyo - back & forth",
    props: {
      text: "Bouncing light ray",
      yoyo: true,
      speed: 2.5,
      color: "#1e3a8a",
      shineColor: "#60a5fa",
    },
  },
  {
    label: "RTL - hover to pause",
    props: {
      text: "Hover me to pause",
      direction: "right" as const,
      pauseOnHover: true,
      speed: 1.5,
      color: "#064e3b",
      shineColor: "#34d399",
      className: "cursor-pointer",
    },
  },
  {
    label: "Delayed sweep",
    props: {
      text: "Slow reveal",
      speed: 1.8,
      delay: 1.2,
      color: "#4a044e",
      shineColor: "#e879f9",
    },
  },
  {
    label: "Wide spread",
    props: {
      text: "Broad shimmer",
      spread: 160,
      speed: 3,
      color: "#1c1917",
      shineColor: "#fde68a",
    },
  },
];

export function ShinyTextView() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-8 dark:border-neutral-800 dark:bg-neutral-950 sm:rounded-3xl sm:px-6 sm:py-12">
      <header className="space-y-2 text-center sm:space-y-3">
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl md:text-4xl">
          ShinyText
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
          Animated gradient text, with all props on display.
        </p>
      </header>

      <main className="mt-6 grid w-full grid-cols-1 gap-4 sm:mt-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map(({ label, props }) => (
          <DemoCard key={label} label={label}>
            <ShinyText {...props} />
          </DemoCard>
        ))}
      </main>
    </div>
  );
}

export default ShinyTextView;
