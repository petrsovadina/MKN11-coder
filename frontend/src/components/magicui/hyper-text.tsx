"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "span",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (children.length * 10);
    const maxIterations = children.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)],
          ),
        );
        iterationCount.current = iterationCount.current + 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet]);

  return (
    <motion.div
      ref={elementRef}
      className={cn("inline-block", className)}
      onMouseEnter={handleAnimationTrigger}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn("font-extrabold", letter === " " ? "w-3" : "")}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}