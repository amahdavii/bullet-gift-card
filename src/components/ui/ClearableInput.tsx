"use client";

import { FC, InputHTMLAttributes } from "react";
import ClearSVG from "../icons/ClearSVG";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ClearableInput: FC<Props> = ({
  id,
  label,
  value,
  setValue,
  placeholder,
  disabled,
  ...inputProps
}) => {
  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border appearance-none peer
          border-gray-300 focus:outline-none focus:ring-0 focus:border-2 focus:border-black
          ${
            disabled
              ? "bg-gray-100 text-[#716E70] border-gray-300"
              : "text-gray-900"
          }
        `}
        {...inputProps}
      />

      {/* لیبل شناور */}
      <label
        htmlFor={id}
        className="absolute start-2 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2
          peer-focus:px-2 peer-focus:text-black
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>

      {/* دکمه پاک کردن */}
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <ClearSVG />
        </button>
      )}
    </div>
  );
};

export default ClearableInput;
