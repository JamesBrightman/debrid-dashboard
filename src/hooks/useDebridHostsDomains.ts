"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getHostsDomains } from "@/service/debrid/debridClient";
import { debridQueryKeys } from "@/service/debrid/queryKeys";
import type { HostsDomainsResponse } from "@/types/response/hostsDomainsResponse";

export const useDebridHostsDomains = (): UseQueryResult<
  HostsDomainsResponse,
  Error
> => {
  return useQuery({
    queryKey: debridQueryKeys.hostsDomains,
    queryFn: getHostsDomains,
  });
};
