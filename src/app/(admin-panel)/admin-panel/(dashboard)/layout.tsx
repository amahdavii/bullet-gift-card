"use client";
import CategorySVG from "@/components/icons/admin-panel/CategorySVG";
import DashBoardSVG from "@/components/icons/admin-panel/DashBoardSVG";
import ProductSVG from "@/components/icons/admin-panel/ProductSVG";
import StoreSVG from "@/components/icons/admin-panel/StoreSVG";
import TransactionSVG from "@/components/icons/admin-panel/TransactionSVG";
import UserSVG from "@/components/icons/admin-panel/UserSVG";
import { useAuthRedirectPanel } from "@/hooks/usePanelAdminRedirect";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const TransactionsLayout: FC<PropsWithChildren> = ({ children }) => {
  useAuthRedirectPanel();
  const pathname = usePathname();

  const navItems = [
    { href: "/admin-panel", label: "Dashboard", icon: <DashBoardSVG /> },
    {
      href: "/admin-panel/transactions",
      label: "Transactions",
      icon: <TransactionSVG />,
    },
  ];

  const managementItems = [
    { href: "/admin-panel/product", label: "Product", icon: <ProductSVG /> },
    {
      href: "/admin-panel/categories",
      label: "Category",
      icon: <CategorySVG />,
    },
    { href: "/admin-panel/store", label: "Store", icon: <StoreSVG /> },
    { href: "/admin-panel/user", label: "User", icon: <UserSVG /> },
  ];

  const linkClass = (href: string) =>
    `px-3 py-2 rounded flex items-center gap-[0.75rem] font-semibold text-[0.875rem] hover:bg-gray-100 transition ${
      pathname === href ? "text-[#D2B084]" : "text-[#637381]"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md flex flex-col p-4">
        <Image
          src="/assets/images/logo.svg"
          width={156}
          height={37}
          alt="logo"
        />

        <nav className="flex flex-col space-y-2 text-gray-700">
          <h2 className="font-bold text-[#919EAB] uppercase text-[0.6875rem] mt-[1.5rem] mb-[0.5rem]">
            Overview
          </h2>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <h2 className="mb-[0.5rem] font-bold text-[#919EAB] uppercase text-[0.6875rem] mt-[1rem]">
            Management
          </h2>
          {managementItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-end items-center space-x-4 mb-6">
          <div className="relative">
            <span className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9a6 6 0 10-12 0v.75a8.967 8.967 0 01-2.311 6.022c1.76.64 3.61 1.085 5.454 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M3.75 6h.008v.008H3.75V6zm0 6h.008v.008H3.75V12zm0 6h.008v.008H3.75V18z"
            />
          </svg>
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>

        <div>
          {children}
          <Toaster />
        </div>
      </main>
    </div>
  );
};

export default TransactionsLayout;
