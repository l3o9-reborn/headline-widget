"use client";

import { Dispatch, SetStateAction } from "react";
import { HeadlineSettings } from "@/lib/types";
import SelectField from "./SelectField";
import { div } from "framer-motion/client";

interface Props {
  settings: HeadlineSettings;
  setSettings: Dispatch<SetStateAction<HeadlineSettings>>;
}

export default function ControlsPanel({ settings, setSettings }: Props) {
  return (
    <div className="flex flex-col gap-6 text-foreground/80">
      {/* Headline Text */}
      <div>
        <label className="block text-sm font-medium mb-1">Headline Text</label>
        <input
          type="text"
          value={settings.text}
          onChange={(e) =>
            setSettings({ ...settings, text: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {/* Font Family */}
      <SelectField
        label="Font Family"
        value={settings.fontFamily}
        options={[
          { value: "Poppins", label: "Poppins" },
          { value: "Inter", label: "Inter" },
          { value: "Roboto", label: "Roboto" },
          { value: "Sans-Serif", label: "Sans-Serif" },
        ]}
        onChange={(val) => setSettings({ ...settings, fontFamily: val })}
      />

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Font Size: {settings.fontSize}px
        </label>
        <input
          type="range"
          min={16}
          max={120}
          value={settings.fontSize}
          onChange={(e) =>
            setSettings({ ...settings, fontSize: parseInt(e.target.value) })
          }
          className="w-full"
        />
      </div>

      {/* Font Weight */}
      <SelectField
        label="Font Weight"
        value={settings.fontWeight}
        options={[
          { value: "thin", label: "Thin" },
          { value: "normal", label: "Normal" },
          { value: "medium", label: "Medium" },
          { value: "bold", label: "Bold" },
          { value: "extrabold", label: "Extra Bold" },
        ]}
        onChange={(val) => setSettings({ ...settings, fontWeight: val })}
      />

      {/* Gradient Toggle */}
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium">Gradient</label>
        <input
          type="checkbox"
          checked={settings.gradient}
          onChange={(e) =>
            setSettings({ ...settings, gradient: e.target.checked })
          }
        />
      </div>

      {/* Gradient Direction */}
      {settings.gradient && (
        <SelectField
          label="Gradient Direction"
          value={settings.gradientDirection}
          options={[
            { value: "to-r", label: "→" },
            { value: "to-l", label: "←" },
            { value: "to-t", label: "↑" },
            { value: "to-b", label: "↓" },
          ]}
          onChange={(val) =>
            setSettings({ ...settings, gradientDirection: val as any })
          }
      />
      )}

      {/* Gradient Colors */}
      {settings.gradient && (
        <div>
          <label className="block text-sm font-medium">Gradient Colors</label>
          <div className="flex gap-2">

            <input
              type="color"
              value={settings.gradientColors[0]}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gradientColors: [e.target.value, settings.gradientColors[1]],
                })
              }
              className="w-1/2 cursor-pointer h-10  p-1 border-0 hover:scale-105 duration-300 "
            />
            <input
              type="color"
              value={settings.gradientColors[1]}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gradientColors: [settings.gradientColors[0], e.target.value],
                })
              }
            className="w-1/2 cursor-pointer h-10 p-1 border-0 hover:scale-105 duration-300 "
            />
          </div>
        </div>
      )}
      {/* Animation Type */}
      <SelectField
        label="Animation"
        value={settings.animationType || "fade"}
        options={[
          { value: "fade", label: "Fade In" },
          { value: "hoverGlow", label: "Hover Glow" },
          { value: "perLetter", label: "Per-Letter Animation" },
          { value: "textShadow", label: "Text Shadow / Outline" },
        ]}
        onChange={(val) => setSettings({ ...settings, animationType: val as any })}
      />
      {/* Duration */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Duration: {settings.duration || 0.8}s
        </label>
        <input
          type="range"
          min={0.2}
          max={5}
          step={0.1}
          value={settings.duration || 0.8}
          onChange={(e) =>
            setSettings({ ...settings, duration: parseFloat(e.target.value) })
          }
          className="w-full"
        />
      </div>

      {/* Delay */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Delay: {settings.delay || 0}s
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={settings.delay || 0}
          onChange={(e) =>
            setSettings({ ...settings, delay: parseFloat(e.target.value) })
          }
          className="w-full"
        />
      </div>


      

    </div>
  );
}
