import React from "react";
import clsx from "clsx";

type ButtonVariant = "solid" | "outline" | "primary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function Button({
  variant = "solid",
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-[0.5rem] px-4 py-[0.875rem] text-sm font-medium transition-colors cursor-pointer",
        {
          // Solid
          "bg-black text-white hover:bg-black/80":
            variant === "solid" && !disabled,
          "bg-[#F1F0F0] text-[#979698] cursor-not-allowed":
            variant === "solid" && disabled,

          // Primary
          "bg-[#C13800] text-white hover:bg-[#b63400]":
            variant === "primary" && !disabled,
          "bg-[#EDC6B6] text-white cursor-not-allowed":
            variant === "primary" && disabled,

          // Outline
          "bg-white border border-black text-black hover:bg-gray-50":
            variant === "outline" && !disabled,
          "bg-[#F1F0F0] text-[#979698]": variant === "outline" && disabled,
        },
        { "w-full" : fullWidth },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
