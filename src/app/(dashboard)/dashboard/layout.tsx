"use client";

import { FC, PropsWithChildren, Suspense } from "react";
import avertastdFont from "@/lib/localFont";
import AppQueryClientProvider from "@/provider/AppQueryClientProvider";
import BottomNav from "@/components/shared/BottomNav";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  useAuthRedirect();
  return (
    <div
      className={`${avertastdFont.variable} bg-[#F1F0F0] min-h-screen max-w-4xl mx-auto`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AppQueryClientProvider>{children}</AppQueryClientProvider>
      </Suspense>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
