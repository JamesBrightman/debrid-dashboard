"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTorrents } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { TorrentsResponse } from "@/types/response/torrentsResponse";

export const useDebridTorrents = (): UseQueryResult<TorrentsResponse, Error> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "torrents", { limit: 20 }],
    enabled: hasKey,
    queryFn: () => getTorrents(apiKey, { limit: 20 }),
  });
};
