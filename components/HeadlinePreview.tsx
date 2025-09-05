"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { HeadlineSettings, HeadlineSegment, GradientDirection, AnimationType } from "@/lib/types";

interface Props { settings: HeadlineSettings }

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

  const transition = { duration, delay, ease: "easeInOut" } as const;

  const baseH1Class = "text-center flex flex-wrap justify-center gap-1 leading-snug text-foreground";

  const textGradient = makeGradient(gradientDirection, gradientColors[0], gradientColors[1]);

  const segmentWrapperStyle: CSSProperties = { display: "inline-block", marginRight: "0.25em", position: "relative" };

  const computeTextStyle = (seg?: HeadlineSegment): CSSProperties => {
    const weight = seg?.style?.fontWeight ?? fontWeight;

    if (gradient) {
      return {
        backgroundImage: textGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: weight,
        display: "inline-block",
      } satisfies CSSProperties;
    }

    return {
      color: "currentColor",
      fontWeight: weight,
      display: "inline-block",
    } satisfies CSSProperties;
  };

  const computeUnderlineStyle = (): CSSProperties => {
    if (gradient) {
      return {
        display: "block",
        height: 2,
        marginTop: 2,
        backgroundImage: textGradient,
        borderRadius: 1,
      } satisfies CSSProperties;
    }
    return {
      display: "block",
      height: 2,
      marginTop: 2,
      backgroundColor: "currentColor", // follows text color
      borderRadius: 1,
    } satisfies CSSProperties;
  };

  const Chip = ({ seg, idx }: { seg: HeadlineSegment; idx: number }) => {
    const styleBlock: CSSProperties = seg.style?.backgroundColor
      ? { backgroundColor: seg.style.backgroundColor, borderRadius: "0.25em", padding: "0.1em 0.25em" }
      : {};

    const commonMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } } as const;

    const content = (
      <motion.span
        {...commonMotion}
        transition={{ delay: delay + idx * 0.05, duration }}
        style={computeTextStyle(seg)}
      >
        {seg.text}
      </motion.span>
    );

    const contentPerLetter = (
      <span style={{ display: "inline-block" }}>
        {Array.from(seg.text).map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + idx * 0.03 + i * 0.02, duration }}
            style={computeTextStyle(seg)}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    );

    return (
      <span key={idx} style={{ ...segmentWrapperStyle, ...styleBlock }}>
        {animationType === "perLetter" ? contentPerLetter : content}
        {seg.style?.underline && <span style={computeUnderlineStyle()} />}
      </span>
    );
  };

  const h1HoverProps = (() => {
    const props: Record<string, unknown> = {};
    if (animationType === "hoverGlow") {
      props.whileHover = { scale: 1.02, textShadow: "0 0 12px currentColor" };
      props.transition = { type: "spring", stiffness: 200, damping: 20 };
    }
    return props;
  })();

  const h1ShadowStyle: CSSProperties = animationType === "textShadow"
    ? { textShadow: gradient ? "0 2px 12px rgba(0,0,0,0.25)" : "0 2px 0 currentColor" }
    : {};

  return (
    <motion.h1
      key={animationType}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
      style={{ fontFamily, fontSize, fontWeight, ...h1ShadowStyle }}
      className={baseH1Class}
      {...h1HoverProps}
    >
      {segments.map((seg, i) => (
        <Chip key={i} seg={seg} idx={i} />
      ))}
    </motion.h1>
  );
}
