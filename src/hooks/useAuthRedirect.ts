"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToken } from "@/hooks/useToken";

export function useAuthRedirect() {
  const { token } = useToken();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/dashboard") && !token) {
      replace("/login");
    }
  }, [token, pathname, replace]);
}
