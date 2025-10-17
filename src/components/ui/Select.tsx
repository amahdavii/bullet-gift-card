"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  multi?: boolean;
  value?: string[] | string | null; // مقدار کنترل‌شده
  onChange?: (value: string[] | string | null) => void;
  label?: string;
  isFull?: boolean;
}

export default function Select({
  options,
  placeholder = "",
  multi = false,
  value,
  onChange,
  label,
  isFull = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option[] | Option | null>(
    multi ? [] : null
  );
  const [search, setSearch] = useState("");

  // Sync selected state with controlled value
  useEffect(() => {
    if (multi) {
      if (Array.isArray(value)) {
        const newSelected = options.filter((o) => value.includes(o.value));
        setSelected(newSelected);
      } else {
        setSelected([]);
      }
    } else {
      const newSelected = options.find((o) => o.value === value) || null;
      setSelected(newSelected);
    }
  }, [value, options, multi]);

  const toggleOption = (option: Option) => {
    if (multi) {
      const arr = Array.isArray(selected) ? [...selected] : [];
      const exists = arr.find((o) => o.value === option.value);

      if (exists) {
        const newVal = arr.filter((o) => o.value !== option.value);
        setSelected(newVal);
        onChange?.(newVal.map((o) => o.value));
      } else {
        const newVal = [...arr, option];
        setSelected(newVal);
        onChange?.(newVal.map((o) => o.value));
      }
    } else {
      setSelected(option);
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  const removeOption = (option: Option) => {
    if (multi) {
      const newVal = (selected as Option[]).filter(
        (o) => o.value !== option.value
      );
      setSelected(newVal);
      onChange?.(newVal.map((o) => o.value));
    } else {
      setSelected(null);
      onChange?.(null);
    }
  };

  const clearAll = () => {
    setSelected(multi ? [] : null);
    onChange?.(multi ? [] : null);
  };

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const hasSelection = multi
    ? Array.isArray(selected) && selected.length > 0
    : selected !== null;

  const isFocusedOrFilled = hasSelection || isOpen;

  return (
    <div className={isFull ? "w-full relative" : "w-64 relative"}>
      {/* Box with floating label */}
      <div
        className="relative flex flex-col"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label && (
          <label
            className={`absolute left-3 transition-all text-gray-500 pointer-events-none ${
              isFocusedOrFilled
                ? "-top-2 text-xs bg-white px-1"
                : "top-2 text-sm"
            }`}
          >
            {label}
          </label>
        )}

        <div className="flex items-center justify-between border border-[#72727214] rounded-lg px-3 py-2 bg-[#919EAB14] cursor-pointer min-h-[2.5rem]">
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {multi ? (
              Array.isArray(selected) && selected.length > 0 ? (
                selected.map((item) => (
                  <span
                    key={item.value}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => removeOption(item)}
                    />
                  </span>
                ))
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )
            ) : selected ? (
              <span>{(selected as Option).label}</span>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasSelection && (
              <X
                size={16}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
              />
            )}
            <ChevronDown
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full border border-[#72727214] rounded-lg bg-white shadow-md max-h-60 overflow-y-auto">
          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#919EAB14] border border-[#72727214] px-2 py-1 rounded-md text-sm focus:outline-none font-inherit"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = multi
                  ? Array.isArray(selected) &&
                    selected.some((o) => o.value === option.value)
                  : (selected as Option)?.value === option.value;

                return (
                  <li
                    key={option.value}
                    onClick={() => toggleOption(option)}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      isSelected ? "bg-blue-100 text-blue-600" : ""
                    }`}
                  >
                    {option.label}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2 text-gray-400 text-sm">Not found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
