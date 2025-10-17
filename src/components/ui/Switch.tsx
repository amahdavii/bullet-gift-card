import React, { useEffect, useState } from "react";

type Size = "sm" | "md" | "lg";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: Size;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const sizeMap: Record<
  Size,
  { track: string; knob: string; translate: string }
> = {
  sm: { track: "w-9 h-5", knob: "w-4 h-4", translate: "translate-x-4" },
  md: { track: "w-11 h-6", knob: "w-5 h-5", translate: "translate-x-5" },
  lg: { track: "w-14 h-7", knob: "w-6 h-6", translate: "translate-x-7" },
};

export default function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  size = "md",
  label,
  disabled = false,
  className = "",
}: SwitchProps) {
  const isControlled = typeof checkedProp === "boolean";
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  useEffect(() => {
    if (isControlled) setChecked(checkedProp as boolean);
  }, [checkedProp, isControlled]);

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setChecked(next);
    onChange?.(next);
  };

  const sizes = sizeMap[size];

  return (
    <label className={`inline-flex items-center gap-3 ${className}`}>
      {label && (
        <span
          className={`select-none text-sm ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
        </span>
      )}

      <button
        role="switch"
        aria-checked={checked}
        aria-label={label ?? (checked ? "On" : "Off")}
        onClick={toggle}
        disabled={disabled}
        className={`relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed ${
          sizes.track
        } ${checked ? "bg-green-600" : "bg-gray-200"}`}
      >
        <span
          className={`inline-block rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            sizes.knob
          } ${checked ? sizes.translate : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}

/*
Usage:

import Switch from "./SwitchComponent";

function Page(){
  const [on, setOn] = React.useState(false);
  return (
    <div className="p-6">
      <Switch label="فعال" checked={on} onChange={setOn} size="md" />
    </div>
  )
}

Notes:
- فقط از Tailwind استفاده می‌کند، هیچ کتابخانه اضافی نیاز نیست.
- انیمیشن با transition های Tailwind انجام می‌شود.
- هم کنترل‌شده و هم کنترل‌نشده کار می‌کند.
*/
