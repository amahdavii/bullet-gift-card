"use client";

import { useEffect } from "react";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheetModal({
  isOpen,
  onClose,
  children,
}: BottomSheetModalProps) {
  // بستن با کلید Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="
          relative bg-white w-full md:max-w-md
          rounded-t-2xl md:rounded-2xl
          p-6 shadow-lg
          transform transition-transform
          animate-slide-up md:animate-fade-in
        "
      >
        {children}
      </div>
    </div>
  );
}
