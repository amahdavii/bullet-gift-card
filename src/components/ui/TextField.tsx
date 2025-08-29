"use client";
import React, { useState } from "react";
import CloseEyeSVG from "../icons/CloseEyeSVG";
import EyeSVG from "../icons/EyeSVG";
import CloseSVG from "../icons/CloseSVG";

interface Props {
  id: string;
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  icon?: React.ReactNode; // آیکون سمت چپ
  clearable?: boolean; // اضافه شده
}

export default function TextField({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  disabled = false,
  icon,
  clearable = false,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="relative w-full">
      {/* آیکون سمت چپ */}
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-2/5 text-gray-400">
          {icon}
        </div>
      )}

      <input
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border appearance-none peer
          ${icon ? "pl-10" : "pl-2.5"}
          border-gray-300 focus:outline-none focus:ring-0 focus:border-2 focus:border-black
          ${
            disabled
              ? "bg-gray-100 text-[#716E70] border-gray-300"
              : "text-gray-900"
          }
        `}
      />

      <label
        htmlFor={id}
        className="absolute start-2 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2
          peer-focus:px-2 peer-focus:text-black
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>

      {/* دکمه نمایش/مخفی کردن پسورد */}
      {type === "password" && !disabled && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <CloseEyeSVG /> : <EyeSVG />}
        </button>
      )}

      {/* دکمه پاک کردن مقدار */}
      {clearable && !disabled && value && (
        <button
          type="button"
          onClick={handleClear}
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none ${
            type === "password" ? "mr-6" : ""
          }`}
        >
          <CloseSVG />
        </button>
      )}
    </div>
  );
}
