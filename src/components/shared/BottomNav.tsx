"use client";

import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

import QrcodeSVG from "../icons/QrcodeSVG";
import HomeSVG from "@/components/icons/HomeSVG";
import BascketSVG from "@/components/icons/BascketSVG";
import DocumentSVG from "@/components/icons/DocumentSVG";
import ProfileSVG from "../icons/ProfileSVG";
import HomeFilledeSVG from "../icons/HomeFilledeSVG";
import OrderListFilledSVG from "../icons/OrderListFilledSVG";
import ProfileFilledSVG from "../icons/ProfileFilledSVG";
import BagFilledSVG from "../icons/BagFilledSVG";

interface NavItemProps {
  icon: React.ReactNode;
  filled: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
}

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // مسیر فعلی
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navItems = [
    {
      icon: <HomeSVG />,
      filled: <HomeFilledeSVG />,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: <BascketSVG />,
      filled: <BagFilledSVG />,
      label: "Order",
      path: "/dashboard/order",
    },
    {
      icon: <DocumentSVG />,
      filled: <OrderListFilledSVG />,
      label: "OrderLisr",
      path: "/dashboard/order-list",
    },
    {
      icon: <ProfileSVG />,
      filled: <ProfileFilledSVG />,
      label: "Profile",
      path: "/dashboard/profile",
    },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  // const handleCameraClick = () => {
  //   fileInputRef.current?.click();
  // };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white grid grid-cols-5 items-center px-8 shadow-[0px_-2px_8px_0px_#BAB9BA1A] max-w-4xl">
      {navItems.slice(0, 2).map((item) => (
        <NavItem
          key={item.path}
          filled={item.filled}
          icon={item.icon}
          label={item.label}
          path={item.path}
          active={pathname === item.path}
          onClick={() => handleNavClick(item.path)}
        />
      ))}

      {/* دکمه وسط */}
      <div className="flex justify-center">
        <button
          // onClick={handleCameraClick}
          className="active:bg-black active:text-white bg-[#D1AE82] border-[0.5rem] border-[#F1E7DB] 
               w-[69px] h-[69px] rounded-full p-4 shadow-lg flex justify-center items-center -translate-y-3"
        >
          <QrcodeSVG />
        </button>
      </div>

      {navItems.slice(2).map((item) => (
        <NavItem
          key={item.path}
          filled={item.filled}
          icon={item.icon}
          label={item.label}
          path={item.path}
          active={pathname === item.path}
          onClick={() => handleNavClick(item.path)}
        />
      ))}

      <input ref={fileInputRef} type="file" className="hidden" />
    </div>
  );
};

export default BottomNav;

function NavItem({ icon, label, active, onClick, filled }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs ${
        active ? "text-black" : "text-gray-400"
      }`}
    >
      {active ? filled : icon}
      {active && <span>{label}</span>}{" "}
    </button>
  );
}
