"use client";

import { ScrambleText } from "./scramble-text";

export function ScrambleTextView() {
  return (
    <div className="flex flex-col items-center justify-center space-y-16 p-8 font-mono">
      <ScrambleText className="max-w-2xl text-center text-lg leading-relaxed text-[#5a5668]">
        Every signal is buried in chaos. Move through the interference to reveal
        what hides beneath the static. The truth is always there, waiting to be
        uncovered by those patient enough to look.
      </ScrambleText>

      <ScrambleText
        as="h1"
        chars="+-*#%@$!?<>[]{}"
        speed={20}
        radius={180}
        accentColor="#00ffcc"
        className="max-w-3xl text-center text-4xl font-bold"
      >
        You can easily reuse this component anywhere in your app.
      </ScrambleText>
    </div>
  );
}

export default ScrambleTextView;
