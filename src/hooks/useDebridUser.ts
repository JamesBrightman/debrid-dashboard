"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const useDebridUser = () => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "user", apiKey],
    enabled: hasKey,
    queryFn: () => getUser(apiKey),
  });
};
