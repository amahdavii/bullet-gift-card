"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToken } from "@/hooks/useToken";

export function useAuthRedirectPanel() {
  const { token } = useToken("panelAccessToken");
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin-panel") && !token) {
      replace("/admin-panel/login");
    }
  }, [token, pathname, replace]);
}
