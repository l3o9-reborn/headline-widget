"use client";

import type { Dispatch, SetStateAction } from "react";
import type { HeadlineSettings, HeadlineSegment } from "@/lib/types";
import { Trash, Plus } from "lucide-react";

interface Props {
  settings: HeadlineSettings;
  setSettings: Dispatch<SetStateAction<HeadlineSettings>>;
}

export default function SegmentControlsPanel({ settings, setSettings }: Props) {
  const segments = settings.segments ?? [];

  const updateSegment = (index: number, patch: Partial<HeadlineSegment>) => {
    const next = [...segments];
    next[index] = { ...next[index], ...patch, style: { ...next[index]?.style, ...patch.style } };
    setSettings({ ...settings, segments: next });
  };

  const addSegment = () => {
    const next = [...segments, { text: "New", style: {} } as HeadlineSegment];
    setSettings({ ...settings, segments: next });
  };

  const removeSegment = (index: number) => {
    const next = segments.filter((_, i) => i !== index);
    setSettings({ ...settings, segments: next });
  };

  return (
    <div className="relative w-full h-full min-h-[50vh] flex flex-col text-foreground/80 gap-4">
      {/* Scrollable content */}
      <div className="flex flex-col gap-2 lg:gap-4 w-full h-full overflow-auto max-h-[calc(100vh-150px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="bg-background/50 shadow-sm rounded-xl p-4 w-full relative transition-colors hover:bg-background/70"
          >
            {/* Headline Text */}
            <div className="flex flex-col w-full mb-3">
              <label className="text-sm font-medium mb-1">Headline Text</label>
              <input
                type="text"
                value={seg.text}
                onChange={(e) => updateSegment(idx, { text: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-muted text-foreground"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Background color chip */}
              <input
                type="color"
                value={seg.style?.backgroundColor ?? "#10B981"}
                onChange={(e) =>
                  updateSegment(idx, { style: { backgroundColor: e.target.value } })
                }
                className="w-16 md:w-24 h-8 rounded-md cursor-pointer"
                title="Background color"
              />

              {/* Underline toggle */}
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={Boolean(seg.style?.underline)}
                  onChange={(e) =>
                    updateSegment(idx, { style: { underline: e.target.checked } })
                  }
                  className="size-4 accent-amber-500 cursor-pointer"
                  title="Underline"
                />
                <span className="text-xs md:text-sm md:hidden lg:block">Underline</span>
              </label>

              {/* Remove */}
              <button
                onClick={() => removeSegment(idx)}
                className="ml-auto inline-flex items-center gap-1 rounded-sm bg-red-500/90 text-white px-2 py-1 text-xs hover:bg-red-600 active:scale-95 cursor-pointer"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {segments.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No segments yet. Click the + to add one.
          </p>
        )}
      </div>

      {/* Add Segment Button */}
      <div className="fixed bottom-5 right-5  self-start mt-2">
        <button
          onClick={addSegment}
          className="fixed bottom-4 left-4 md:relative md:bottom-auto md:left-auto w-12 h-12 flex items-center justify-center text-2xl bg-amber-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Add segment"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
