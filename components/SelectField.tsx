"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button className="flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-amber-400">
           <span>
              {options.find((o) => o.value === value)?.label ?? value}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 pointer-events-none" />
          </Listbox.Button>

          {/* Options */}
          <Listbox.Options className="absolute mt-1 w-full rounded bg-background shadow-lg z-10">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt.value}
                className={({ active }) =>
                  `px-3 py-2 cursor-pointer ${
                    active ? "bg-amber-400 text-white" : ""
                  }`
                }
              >
                {opt.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
