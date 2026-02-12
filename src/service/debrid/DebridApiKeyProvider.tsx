"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

type DebridApiKeyContextValue = {
  apiKey: string;
  hasKey: boolean;
  isHydrated: boolean;
  setApiKey: (key: string) => void;
};

const STORAGE_KEY = "debrid-key";

const DebridApiKeyContext = createContext<DebridApiKeyContextValue | undefined>(
  undefined,
);

export function DebridApiKeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const [apiKey, setApiKeyState] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedKey = window.localStorage.getItem(STORAGE_KEY) ?? "";
    setApiKeyState(storedKey);
    setIsHydrated(true);
  }, []);

  const setApiKey = useCallback(
    (key: string) => {
      const nextKey = key.trim();

      if (nextKey) {
        window.localStorage.setItem(STORAGE_KEY, nextKey);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }

      setApiKeyState(nextKey);
      queryClient.clear();
    },
    [queryClient],
  );

  const value = useMemo(
    () => ({
      apiKey,
      hasKey: apiKey.length > 0,
      isHydrated,
      setApiKey,
    }),
    [apiKey, isHydrated, setApiKey],
  );

  return (
    <DebridApiKeyContext.Provider value={value}>
      {children}
    </DebridApiKeyContext.Provider>
  );
}

export const useDebridApiKey = () => {
  const context = useContext(DebridApiKeyContext);

  if (!context) {
    throw new Error(
      "useDebridApiKey must be used within a DebridApiKeyProvider",
    );
  }

  return context;
};
