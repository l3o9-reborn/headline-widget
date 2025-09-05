"use client";

import type { Dispatch, SetStateAction } from "react";
import type { HeadlineSettings, GradientDirection } from "@/lib/types";
import SelectField from "./SelectField";

interface Props {
  settings: HeadlineSettings;
  setSettings: Dispatch<SetStateAction<HeadlineSettings>>;
}

const FONT_WEIGHT_OPTIONS = [
  { value: "100", label: "Thin 100" },
  { value: "300", label: "Light 300" },
  { value: "400", label: "Normal 400" },
  { value: "500", label: "Medium 500" },
  { value: "600", label: "Semibold 600" },
  { value: "700", label: "Bold 700" },
  { value: "800", label: "Extrabold 800" },
  { value: "900", label: "Black 900" },
];

export default function ControlsPanel({ settings, setSettings }: Props) {
  return (
    <div className="flex flex-col gap-6 text-foreground/80">
      {/* Font Family */}
      <SelectField
        label="Font Family"
        value={settings.fontFamily}
        options={[
          { value: "Poppins", label: "Poppins" },
          { value: "Inter", label: "Inter" },
          { value: "Roboto", label: "Roboto" },
          { value: "sans-serif", label: "Sans Serif" },
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
          max={160}
          value={settings.fontSize}
          onChange={(e) =>
            setSettings({ ...settings, fontSize: Number(e.target.value) })
          }
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>

      {/* Font Weight */}
      <SelectField
        label="Font Weight"
        value={String(settings.fontWeight)}
        options={FONT_WEIGHT_OPTIONS}
        onChange={(val) =>
          setSettings({ ...settings, fontWeight: Number.parseInt(val, 10) })
        }
      />

      {/* Gradient Toggle */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Gradient</label>
        <input
          type="checkbox"
          checked={settings.gradient}
          onChange={(e) => setSettings({ ...settings, gradient: e.target.checked })}
          className="size-4 accent-amber-500 cursor-pointer"
        />
      </div>

      {/* Gradient Direction */}
      {settings.gradient && (
        <SelectField
          label="Gradient Direction"
          value={settings.gradientDirection}
          options={[
            { value: "to-r", label: "→ Right" },
            { value: "to-l", label: "← Left" },
            { value: "to-t", label: "↑ Top" },
            { value: "to-b", label: "↓ Bottom" },
          ]}
          onChange={(val) =>
            setSettings({ ...settings, gradientDirection: val as GradientDirection })
          }
        />
      )}

      {/* Gradient Colors */}
      {settings.gradient && (
        <div>
          <label className="block text-sm font-medium mb-2">Gradient Colors</label>
          <div className="flex gap-2">
            <input
              aria-label="Gradient start color"
              type="color"
              value={settings.gradientColors[0]}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gradientColors: [e.target.value, settings.gradientColors[1]],
                })
              }
              className="w-1/2 h-10 rounded-md cursor-pointer  hover:scale-105 transition-transform duration-200"
            />
            <input
              aria-label="Gradient end color"
              type="color"
              value={settings.gradientColors[1]}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gradientColors: [settings.gradientColors[0], e.target.value],
                })
              }
              className="w-1/2 h-10 rounded-md cursor-pointer  hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      )}

      {/* Animation Type */}
      <SelectField
        label="Animation"
        value={settings.animationType ?? "fade"}
        options={[
          { value: "fade", label: "Fade In" },
          { value: "hoverGlow", label: "Hover Glow" },
          { value: "perLetter", label: "Per-Letter" },
          { value: "textShadow", label: "Text Shadow" },
        ]}
        onChange={(val) => setSettings({ ...settings, animationType: val as HeadlineSettings["animationType"] })}
      />

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Duration: {settings.duration ?? 0.8}s
        </label>
        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={settings.duration ?? 0.8}
          onChange={(e) =>
            setSettings({ ...settings, duration: Number.parseFloat(e.target.value) })
          }
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>

      {/* Delay */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Delay: {settings.delay ?? 0}s
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={settings.delay ?? 0}
          onChange={(e) =>
            setSettings({ ...settings, delay: Number.parseFloat(e.target.value) })
          }
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
