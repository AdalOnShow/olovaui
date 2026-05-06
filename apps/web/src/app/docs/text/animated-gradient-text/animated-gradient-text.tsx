"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

const getGradientAngle = (dir: string): string => {
  if (dir === "vertical") return "to bottom";
  if (dir === "horizontal") return "to right";
  return "to bottom right";
};

const getBackgroundDimensions = (dir: string): string => {
  if (dir === "vertical") return "100% 300%";
  if (dir === "horizontal") return "300% 100%";
  return "300% 300%";
};

export interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export function GradientText(props: AnimatedGradientProps) {
  const {
    children,
    className = "",
    colors = ["#5227FF", "#FF9FFC", "#B497CF"],
    animationSpeed = 8,
    showBorder = false,
    direction = "horizontal",
    pauseOnHover = false,
    yoyo = true,
  } = props;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const animProgress = useMotionValue(0);
  const timeTrackRef = useRef<number>(0);
  const prevFrameRef = useRef<number | null>(null);

  const durationMs = animationSpeed * 1000;

  useAnimationFrame((timestamp) => {
    const shouldHalt = pauseOnHover && isHovered;

    if (shouldHalt) {
      prevFrameRef.current = null;
      return;
    }

    if (prevFrameRef.current === null) {
      prevFrameRef.current = timestamp;
      return;
    }

    const delta = timestamp - prevFrameRef.current;
    prevFrameRef.current = timestamp;
    timeTrackRef.current += delta;

    if (!yoyo) {
      const linearProgress = (timeTrackRef.current / durationMs) * 100;
      animProgress.set(linearProgress);
    } else {
      const totalDuration = durationMs * 2;
      const cyclePos = timeTrackRef.current % totalDuration;
      const isReturning = cyclePos > durationMs;

      const progressVal = isReturning
        ? 100 - ((cyclePos - durationMs) / durationMs) * 100
        : (cyclePos / durationMs) * 100;

      animProgress.set(progressVal);
    }
  });

  useEffect(() => {
    timeTrackRef.current = 0;
    prevFrameRef.current = null;
    animProgress.set(0);
  }, [animationSpeed, yoyo, animProgress]);

  const bgPosTransform = useTransform(animProgress, (val) => {
    switch (direction) {
      case "vertical":
        return `50% ${val}%`;
      case "diagonal":
        return `${val}% ${val}%`;
      case "horizontal":
      default:
        return `${val}% 50%`;
    }
  });

  const coreGradientStyles = useMemo(() => {
    const colorPaletteString = [...colors, colors[0]].join(", ");
    return {
      backgroundImage: `linear-gradient(${getGradientAngle(direction)}, ${colorPaletteString})`,
      backgroundSize: getBackgroundDimensions(direction),
      backgroundRepeat: "repeat",
    };
  }, [colors, direction]);

  return (
    <motion.div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center overflow-hidden rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 cursor-pointer ${
        showBorder ? "py-1 px-2" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showBorder && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-[1.25rem]"
          style={{ ...coreGradientStyles, backgroundPosition: bgPosTransform }}
        >
          <div
            className="absolute z-[-1] rounded-[1.25rem] bg-black"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="relative z-[2] inline-block bg-clip-text text-transparent"
        style={{
          ...coreGradientStyles,
          backgroundPosition: bgPosTransform,
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default GradientText;
