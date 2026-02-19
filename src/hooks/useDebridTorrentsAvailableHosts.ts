"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTorrentsAvailableHosts } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { TorrentsAvailableHostsResponse } from "@/types/response/torrentsAvailableHostsResponse";

export const useDebridTorrentsAvailableHosts = (): UseQueryResult<
  TorrentsAvailableHostsResponse,
  Error
> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "torrents", "availableHosts"],
    enabled: hasKey,
    queryFn: () => getTorrentsAvailableHosts(apiKey),
  });
};
