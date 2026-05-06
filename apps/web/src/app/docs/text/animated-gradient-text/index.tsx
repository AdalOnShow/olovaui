"use client";

import { GradientText } from "./animated-gradient-text";


export function AnimatedGradientTextView() {
  return (
    <div className="bg-white px-4 py-8 dark:border-neutral-800 dark:bg-neutral-950 sm:rounded-3xl sm:px-6 sm:py-12">
      <GradientText className="text-5xl">Clean Syntax</GradientText>
    </div>
  );
}

export default AnimatedGradientTextView;
