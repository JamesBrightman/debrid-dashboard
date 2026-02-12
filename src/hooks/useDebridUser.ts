"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const useDebridUser = () => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "user"],
    enabled: hasKey,
    queryFn: () => getUser(apiKey),
  });
};
