"use client";
import { useState, useEffect, useCallback } from "react";

type StorageType = "local" | "session";

interface UseTokenOptions {
  type?: StorageType;
  defaultValue?: string;
}

export function useToken(
  key: string = "accessToken",
  options: UseTokenOptions = {}
) {
  const { type = "local", defaultValue = "" } = options;

  const storage =
    typeof window !== "undefined"
      ? type === "local"
        ? window.localStorage
        : window.sessionStorage
      : null;

  const readToken = (): string => {
    if (!storage) return defaultValue;
    try {
      const item = storage.getItem(key);
      return item ?? defaultValue;
    } catch (error) {
      console.error("Error reading token from storage", error);
      return defaultValue;
    }
  };

  const [token, setTokenState] = useState<string>(readToken);

  const setToken = useCallback(
    (value: string) => {
      try {
        setTokenState(value);
        if (storage) {
          storage.setItem(key, value); // 👈 مستقیم فقط رشته ذخیره میشه
        }
      } catch (error) {
        console.error("Error setting token in storage", error);
      }
    },
    [key, storage]
  );

  const removeToken = useCallback(() => {
    try {
      setTokenState(defaultValue);
      if (storage) storage.removeItem(key);
    } catch (error) {
      console.error("Error removing token from storage", error);
    }
  }, [key, storage, defaultValue]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === storage) {
        setTokenState(readToken());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, storage]);

  return { token, setToken, removeToken };
}
