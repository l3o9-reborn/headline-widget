"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { HeadlineSettings, GradientDirection } from "@/lib/types";

interface Props {
  settings: HeadlineSettings;
}

const dirToDeg = (dir: GradientDirection): string => {
  switch (dir) {
    case "to-r": return "90deg";
    case "to-l": return "270deg";
    case "to-t": return "0deg";
    case "to-b": return "180deg";
    default: return "90deg";
  }
};

const makeGradient = (dir: GradientDirection, c0: string, c1: string) =>
  `linear-gradient(${dirToDeg(dir)}, ${c0}, ${c1})`;

export default function HeadlinePreview({ settings }: Props) {
  const {
    fontFamily,
    fontSize,
    fontWeight,
    gradient,
    gradientDirection,
    gradientColors = ["#ff7a18", "#af002d"],
    animationType = "fade",
    delay = 0,
    duration = 0.8,
    segments = [],
  } = settings;

  const containerRef = useRef<HTMLHeadingElement>(null);
  const textGradient = makeGradient(gradientDirection, gradientColors[0], gradientColors[1]);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".letter");
    const tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.6)" } });

    if (animationType === "perLetter") {
      tl.fromTo(
        letters,
        { y: -100, rotation: -15, scale: 0.6, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, stagger: 0.05, duration: duration * 1.5, delay }
      );
    } else if (animationType === "fade") {
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: -200, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: duration * 1.5, delay, ease: "power3.out" }
      );
    } else if (animationType === "textShadow") {
      tl.fromTo(
        letters,
        { y: -250, scale: 0.7, opacity: 0, textShadow: "0 0 0 rgba(0,0,0,0)" },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          textShadow: "0 4px 12px rgba(0,0,0,0.4)",
          stagger: 0.06,
          duration: duration * 1.5,
        }
      );
    }

    // Hover glow: animate scale + text-shadow without breaking gradient
    if (animationType === "hoverGlow") {
      letters.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.15, textShadow: "0 0 20px #fff", duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, textShadow: "0 0 8px rgba(255,255,255,0.3)", duration: 0.4 });
        });
      });
    }
  }, [segments, animationType, delay, duration]);

  return (
    <h1
      ref={containerRef}
      style={{ fontFamily, fontSize, fontWeight }}
      className="text-center flex flex-wrap justify-center gap-1 leading-snug"
    >
      {segments.map((seg, i) =>
        Array.from(seg.text).map((ch, idx) => (
          <span
            key={`${i}-${idx}`}
            className="letter inline-block"
            style={{
              backgroundImage: gradient ? textGradient : undefined,
              WebkitBackgroundClip: gradient ? "text" : undefined,
              WebkitTextFillColor: gradient ? "transparent" : undefined,
              fontWeight,
              display: "inline-block",
              marginRight: "0.05em",
              position: "relative",
              textShadow: animationType === "textShadow" ? "0 0 0 rgba(0,0,0,0)" : undefined,
            }}
          >
            {ch}
          </span>
        ))
      )}
    </h1>
  );
}
