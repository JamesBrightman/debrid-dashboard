"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getDownloads } from "@/service/debrid/debridClient";
import { debridQueryKeys } from "@/service/debrid/queryKeys";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { DownloadsResponse } from "@/types/response/downloadsResponse";

export const useDebridDownloads = (): UseQueryResult<DownloadsResponse, Error> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: debridQueryKeys.downloads,
    enabled: hasKey,
    queryFn: () => getDownloads(apiKey),
  });
};
