"use client";

import React, { FC, useEffect } from "react";
import IconButton from "../ui/IconButton";
import CloseSVG from "../icons/CloseSVG";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullScreenModal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="relative bg-white w-full h-full rounded-none shadow-lg flex flex-col">
        <header className="flex justify-between items-center w-full max-w-4xl mx-auto px-[1.5rem] py-[0.875rem]">
          <IconButton onClick={onClose}>
            <CloseSVG />
          </IconButton>
          <h1 className="text-[1rem] font-semibold text-[#0C0A0C]">
            Date Range
          </h1>
          <div className="w-[38px] h-[32px]" />
        </header>

        <div className="flex justify-center items-center overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
