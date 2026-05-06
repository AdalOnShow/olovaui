"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

type ShineDirection = "left" | "right";

interface ShineProgressOptions {
  disabled: boolean;
  isPaused: boolean;
  speed: number;
  delay: number;
  yoyo: boolean;
  direction: ShineDirection;
}

function useShineProgress({
  disabled,
  isPaused,
  speed,
  delay,
  yoyo,
  direction,
}: ShineProgressOptions) {
  const animMs = Math.max(speed, 0.001) * 1000;
  const delayMs = Math.max(delay, 0) * 1000;
  const cycleMs = animMs + delayMs;
  const isRTL = direction === "right";

  const progress = useMotionValue(isRTL ? 100 : 0);
  const elapsed = useRef(0);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    elapsed.current = 0;
    lastTime.current = null;
    progress.set(isRTL ? 100 : 0);
  }, [isRTL, progress]);

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTime.current = null;
      return;
    }

    if (lastTime.current === null) {
      lastTime.current = time;
      return;
    }

    elapsed.current += time - lastTime.current;
    lastTime.current = time;

    const flip = (value: number) => (isRTL ? 100 - value : value);

    if (yoyo) {
      const t = elapsed.current % (cycleMs * 2);
      if (t < animMs) {
        progress.set(flip((t / animMs) * 100));
      } else if (t < cycleMs) {
        progress.set(flip(100));
      } else if (t < cycleMs + animMs) {
        progress.set(flip(100 - ((t - cycleMs) / animMs) * 100));
      } else {
        progress.set(flip(0));
      }
      return;
    }

    const t = elapsed.current % cycleMs;
    progress.set(t < animMs ? flip((t / animMs) * 100) : flip(100));
  });

  return progress;
}

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: ShineDirection;
  delay?: number;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
  color = "#4b5563",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}: ShinyTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useShineProgress({
    disabled,
    isPaused,
    speed,
    delay,
    yoyo,
    direction,
  });
  const backgroundPosition = useTransform(
    progress,
    (value) => `${150 - value * 2}% center`,
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return (
    <motion.span
      className={`inline-block select-none ${className}`}
      style={{
        backgroundImage: `linear-gradient(
          ${spread}deg,
          ${color} 0%,
          ${color} 35%,
          ${shineColor} 50%,
          ${color} 65%,
          ${color} 100%
        )`,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundPosition,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
}

export default ShinyText;
