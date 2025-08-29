"use client";

import ChevronRightSVG from "@/components/icons/ChevronRightSVG";
import ExitSVG from "@/components/icons/ExitSVG";
import HomeProfileSVG from "@/components/icons/HomeProfileSVG";
import LockSVG from "@/components/icons/LockSVG";
import TermSVG from "@/components/icons/TermSVG";
import { useStoreLogout } from "@/services/dashboard/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { mutateAsync } = useStoreLogout();
  const { replace } = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(localStorage.getItem("name") ?? "");
      setEmail(localStorage.getItem("email") ?? "");
    }
  }, []);

  return (
    <div>
      <header className="bg-white flex justify-center py-[0.875rem]">
        <h3 className="font-bold">Profile</h3>
      </header>
      <main className="px-[1.5rem] py-[1rem]">
        <div className="bg-white rounded-[1rem] h-[75vh]">
          <div className="p-[1rem] border-b border-[#E3E1E2] flex items-center gap-[1.5rem]">
            <div className="w-[3.5rem] h-[3.5rem] bg-[#E3E1E2] rounded-full flex items-center justify-center">
              <HomeProfileSVG />
            </div>
            <div>
              <h2 className="text-[#0C0A0C] font-bold">{name}</h2>
              <span className="text-[0.75rem] text-[#B3ADB1]">{email}</span>
            </div>
          </div>
          <ul>
            <li>
              <Link
                href="/dashboard/profile/change-password"
                className="px-[1rem] py-[1.25rem] flex items-center justify-between"
              >
                <div className="flex items-center gap-[1rem]">
                  <LockSVG />
                  <p className="font-semibold text-[#525153]">
                    Change Password
                  </p>
                </div>
                <ChevronRightSVG color="#BAB9BA" />
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/profile/terms"
                className="px-[1rem] py-[1.25rem] flex items-center justify-between"
              >
                <div className="flex items-center gap-[1rem]">
                  <TermSVG />
                  <p className="font-semibold text-[#525153]">
                    Terms & Conditions
                  </p>
                </div>
                <ChevronRightSVG color="#BAB9BA" />
              </Link>
            </li>

            <li className="px-[1rem] py-[1.25rem]">
              <div
                className="flex items-center gap-[1rem] cursor-pointer"
                onClick={() =>
                  mutateAsync({}).then(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("name");
                    localStorage.removeItem("email");

                    replace("/login");
                  })
                }
              >
                <ExitSVG />
                <p className="font-semibold text-[#C13800]">Exit</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
