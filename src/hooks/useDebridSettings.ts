"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const useDebridSettings = () => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "settings"],
    enabled: hasKey,
    queryFn: () => getSettings(apiKey),
  });
};
