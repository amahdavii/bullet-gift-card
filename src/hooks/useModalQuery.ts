"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ExtraParams = Record<string, string | number | boolean | undefined>;

export const useModalQuery = ({
  modalKey = "modal",
  modalValue,
}: {
  modalKey?: string;
  modalValue: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(searchParams.get(modalKey) === modalValue);
  }, [searchParams, modalKey, modalValue]);

  const open = (extraParams: ExtraParams = {}) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(modalKey, modalValue);

    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    });

    setIsOpen(true);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const close = () => {
    setIsOpen(false);

    const params = new URLSearchParams();
    const title = searchParams.get("title");
    if (title) {
      params.set("title", title);
    }

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : pathname, { scroll: false });
  };

  return { isOpen, open, close };
};
