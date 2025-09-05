"use client";

import { useState } from "react";
import HeadlinePreview from "../components/HeadlinePreview";
import ControlsPanel from "../components/ControlsPanel";
import { HeadlineSettings } from "@/lib/types";
import { ModeToggle } from "@/components/ui/themeToggle";

export default function Home() {
  const [settings, setSettings] = useState<HeadlineSettings>({
    text: "Welcome to My Site",
    fontFamily: "Poppins",
    fontSize: 48,
    fontWeight: "bold",
    gradient: true,
    gradientDirection: "to-r",
    gradientColors: ["#f59e0b", "#ec4899"],
    effects: {
      fadeIn: true,
      hoverGlow: true,
      perLetter: false,
    },
  });

  return (
    <div className="min-h-screen relative  flex flex-col md:flex-row p-8 gap-8">
      <div className="absolute top-5 right-5 ">
        <ModeToggle/>
      </div>
      {/* Left: Controls */}
      <div className="w-full md:w-1/3 bg-muted p-6 rounded-lg shadow">
        <ControlsPanel settings={settings} setSettings={setSettings} />
      </div>

      {/* Right: Preview */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <HeadlinePreview settings={settings} />
      </div>
    </div>
  );
}
