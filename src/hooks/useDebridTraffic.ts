"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTraffic } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { TrafficResponse } from "@/types/response/trafficResponse";

export const useDebridTraffic = (): UseQueryResult<TrafficResponse, Error> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "traffic"],
    enabled: hasKey,
    queryFn: () => getTraffic(apiKey),
  });
};
