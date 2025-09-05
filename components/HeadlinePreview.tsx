"use client";

import { motion } from "framer-motion";
import { HeadlineSettings } from "@/lib/types";

interface Props {
  settings: HeadlineSettings;
}

export default function HeadlinePreview({ settings }: Props) {
  const {
    text,
    fontFamily,
    fontSize,
    fontWeight,
    gradient,
    gradientDirection,
    gradientColors,
    animationType = "fade",
    delay = 0,
    duration = 0.8,
  } = settings;

  // Gradient style
  const gradientStyle = gradient
    ? {
        backgroundImage: `linear-gradient(${gradientDirection
          .replace("to-r", "90deg")
          .replace("to-l", "270deg")
          .replace("to-t", "0deg")
          .replace("to-b", "180deg")}, ${gradientColors[0]}, ${gradientColors[1]})`,
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent" as const,
      }
    : {};

  // Motion variants
  const motionVariants = {
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  };

  // Decide motion props
  const { initial, animate } = motionVariants[animationType as keyof typeof motionVariants] || motionVariants.fade;

  const transition = { duration, delay, ease: "easeInOut" };

  // Hover glow style
  const hoverGlowStyle =
    animationType === "hoverGlow"
      ? { transition: "text-shadow 0.3s ease", cursor: "default" }
      : {};

  // Text shadow / outline style
  const textShadowStyle =
    animationType === "textShadow"
      ? { textShadow: "30px 30px 4px rgba(0,0,0,0.6)" }
      : {};

  return (
    <motion.h1
      key={`${animationType}-${text}`}
      initial={initial}
      animate={animate}
      transition={transition}
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight as any,
        ...gradientStyle,
        ...hoverGlowStyle,
        ...textShadowStyle,
      }}
      className={`text-center ${animationType === "hoverGlow" ? "hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" : ""}`}
    >
      {animationType === "perLetter"
        ? text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + delay, duration }}
            >
              {char}
            </motion.span>
          ))
        : text}
    </motion.h1>
  );
}
