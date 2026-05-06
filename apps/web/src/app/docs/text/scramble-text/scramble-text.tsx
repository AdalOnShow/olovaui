"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
} from "react";

const scrambleStyles = `
  .scramble-char {
    display: inline-block;
    will-change: transform, color;
    transition: color 0.15s, text-shadow 0.15s, transform 0.25s cubic-bezier(0.2, 0, 0, 1);
  }
  .scramble-char.active {
    color: var(--scramble-accent, #ff6b35);
    text-shadow: 0 0 30px var(--scramble-accent, rgba(255,107,53,0.4)), 0 0 60px var(--scramble-accent, rgba(255,107,53,0.15));
  }
  .scramble-char.resolved {
    color: inherit;
  }
`;

export interface ScrambleTextProps {
  children: string;
  chars?: string;
  speed?: number;
  radius?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  accentColor?: string;
}

type ScrambleStyleVars = CSSProperties & { "--scramble-accent": string };

export function ScrambleText({
  children,
  chars = "01001101",
  speed = 35,
  radius = 130,
  as: Tag = "p",
  className = "",
  style,
  accentColor = "#ff6b35",
}: ScrambleTextProps) {
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const intervalsRef = useRef<Map<number, ReturnType<typeof setInterval>>>(
    new Map(),
  );
  const mouseRef = useRef({ x: -100, y: -100 });
  const charArray = useMemo(() => children.split(""), [children]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationId: number;
    const activeIntervals = intervalsRef.current;

    const loop = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;

      spansRef.current.forEach((span, index) => {
        if (!span || charArray[index] === " ") return;

        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

        if (distance < radius) {
          span.classList.add("active");
          span.classList.remove("resolved");

          if (!activeIntervals.has(index)) {
            const original = span.dataset.o ?? "";
            let iterations = 0;
            const maxIterations = 6 + Math.floor(Math.random() * 8);

            const intervalId = setInterval(() => {
              span.textContent =
                chars[Math.floor(Math.random() * chars.length)];
              iterations += 1;

              if (iterations >= maxIterations) {
                span.textContent = original;
                const existingInterval = activeIntervals.get(index);
                if (existingInterval) {
                  clearInterval(existingInterval);
                }
                activeIntervals.delete(index);
              }
            }, speed);

            activeIntervals.set(index, intervalId);
          }

          const proximity = 1 - distance / radius;
          span.style.transform = `scale(${1 + proximity * 0.18}) translateY(${-proximity * 5}px)`;
          return;
        }

        span.classList.remove("active");
        if (span.dataset.o === span.textContent) {
          span.classList.add("resolved");
        }
        span.style.transform = "scale(1) translateY(0px)";
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      activeIntervals.forEach((intervalId) => clearInterval(intervalId));
      activeIntervals.clear();
    };
  }, [charArray, chars, speed, radius]);

  return (
    <>
      <style>{scrambleStyles}</style>
      <Tag
        className={className}
        style={
          {
            "--scramble-accent": accentColor,
            ...style,
          } as ScrambleStyleVars
        }
      >
        {charArray.map((char, index) =>
          char === " " ? (
            <span key={index}> </span>
          ) : (
            <span
              key={index}
              data-o={char}
              ref={(element) => {
                spansRef.current[index] = element;
              }}
              className="scramble-char"
            >
              {char}
            </span>
          ),
        )}
      </Tag>
    </>
  );
}

export default ScrambleText;
