"use client";

import { useState } from "react";
import HeadlinePreview from "../components/HeadlinePreview";
import ControlsPanel from "../components/ControlsPanel";
import SegmentControlsPanel from "@/components/SegmentControlsPanel";
import { HeadlineSettings } from "@/lib/types";
import { ModeToggle } from "@/components/ui/themeToggle";

export default function Home() {
  const [settings, setSettings] = useState<HeadlineSettings>({
    fontFamily: "Poppins",
    fontSize: 48,
    fontWeight: 700,
    gradient: true,
    gradientDirection: "to-r",
    gradientColors: ["#f59e0b", "#ec4899"],
    animationType: "fade",
    duration: 0.8,
    delay: 0,
    segments: [],
  });

  const [showSegments, setShowSegments] = useState(false);

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "headline-settings.json");
    dlAnchor.click();
  };

  const copyCode = async () => {
    const code = `const headlineSettings = ${JSON.stringify(settings, null, 2)};`;
    await navigator.clipboard.writeText(code);
    alert("Headline settings copied to clipboard!");
  };

  return (
    <div className="min-h-screen p-5 relative flex flex-col-reverse md:flex-row">
      {/* Top-right mode toggle */}
      <div className="absolute top-5 right-5 z-50 flex gap-2">
        <ModeToggle />
        <button
          onClick={exportJSON}
          className="px-3 py-1 rounded bg-amber-400 text-white text-sm shadow cursor-pointer"
        >
          Export JSON
        </button>
        <button
          onClick={copyCode}
          className="px-3 py-1 rounded bg-amber-400 text-white text-sm shadow cursor-pointer"
        >
          Copy Code
        </button>
      </div>

      {/* Left: Controls Panel */}
      <div className="w-full  md:max-w-[400px] md:w-1/3 bg-muted rounded-lg shadow flex flex-col">
        {/* Toggle buttons */}
        <div className="flex w-full gap-2 p-1 h-12">
          <button
            className={`w-1/2 h-full rounded-md cursor-pointer ${
              !showSegments ? "bg-amber-400 text-white" : "bg-background"
            } font-semibold`}
            onClick={() => setShowSegments(false)}
          >
            General
          </button>
          <button
            className={`w-1/2 h-full rounded-md cursor-pointer ${
              showSegments ? "bg-amber-400 text-white" : "bg-background"
            } font-semibold`}
            onClick={() => setShowSegments(true)}
          >
            Segments
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 relative overflow-auto p-6">
          {!showSegments ? (
            <ControlsPanel settings={settings} setSettings={setSettings} />
          ) : (
            <SegmentControlsPanel settings={settings} setSettings={setSettings} />
          )}
        </div>
      </div>

      {/* Right: Preview */}
      <div className=" mt-10 md:mt-0 w-full md:w-2/3 flex items-center justify-center p-8 ">
        <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center rounded-lg bg-background shadow-sm shadow-foreground">
          <HeadlinePreview settings={settings} />
        </div>
      </div>
    </div>
  );
}
