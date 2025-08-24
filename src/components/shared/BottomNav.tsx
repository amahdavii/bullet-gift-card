"use client";
import { useRef } from "react";
import QrcodeSVG from "../icons/QrcodeSVG";
import HomeSVG from "@/components/icons/HomeSVG";
import BascketSVG from "@/components/icons/BascketSVG";
import DocumentSVG from "@/components/icons/DocumentSVG";
import ProfileSVG from "../icons/ProfileSVG";

const BottomNav: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-between items-center px-8 shadow-[0px_-2px_8px_0px_#BAB9BA1A]">
      <NavItem icon={<HomeSVG />} label="" active />
      <NavItem icon={<BascketSVG />} label="" />

      {/* دکمه وسط */}
      <div className="relative -top-3">
        <button
          onClick={handleCameraClick}
          className="bg-[#D1AE82] border-[0.5rem] border-[#F1E7DB] w-[69px] h-[69px] text-white rounded-full p-4 shadow-lg flex justify-center items-center"
        >
          <QrcodeSVG />
        </button>
      </div>

      <NavItem icon={<DocumentSVG />} label="" />
      <NavItem icon={<ProfileSVG />} label="" />
    </div>
  );
};

export default BottomNav;

function NavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center text-xs ${
        active ? "text-black" : "text-gray-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
