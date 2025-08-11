import React, { FC } from "react";

interface Props {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: FC<Props> = ({
  id,
  label,
  value,
  placeholder,
  rows = 4,
  onChange,
}) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-2 focus:border-black peer resize-none"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className="absolute start-2 text-sm text-gray-500 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] bg-white px-2
        peer-focus:text-black
        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:top-0 peer-focus:top-2 peer-focus:scale-95 peer-focus:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
};

export default TextAreaField;
