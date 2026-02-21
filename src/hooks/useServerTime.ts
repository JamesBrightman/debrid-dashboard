"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getServerTime } from "@/service/debrid/debridClient";
import { debridQueryKeys } from "@/service/debrid/queryKeys";
import type { ServerTimeResponse } from "@/types/response/serverTimeResponse";

export const useServerTime = (): UseQueryResult<ServerTimeResponse, Error> => {
  return useQuery({
    queryKey: debridQueryKeys.serverTime,
    queryFn: getServerTime,
  });
};
