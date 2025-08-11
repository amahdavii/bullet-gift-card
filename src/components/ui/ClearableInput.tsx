"use client";

import { FC, InputHTMLAttributes } from "react";
import ClearSVG from "../icons/ClearSVG";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setClear: React.Dispatch<React.SetStateAction<null>>;
}

const ClearableInput: FC<Props> = ({
  value,
  setValue,
  setClear,
  placeholder,
  ...inputProps
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-[0.5rem] px-3 py-2 w-full max-w-md focus-within:border-1 focus-within:border-black transition-all">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="flex-1 outline-none text-lg"
        {...inputProps}
      />
      <button
        onClick={() => setClear(null)}
        className="cursor-pointer text-gray-400 hover:text-gray-600 transition"
      >
        <ClearSVG />
      </button>
    </div>
  );
};

export default ClearableInput;
