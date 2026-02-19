"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTorrentsActiveCount } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { TorrentsActiveCountResponse } from "@/types/response/torrentsActiveCountResponse";

export const useDebridTorrentsActiveCount = (): UseQueryResult<
  TorrentsActiveCountResponse,
  Error
> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "torrents", "activeCount"],
    enabled: hasKey,
    queryFn: () => getTorrentsActiveCount(apiKey),
  });
};
