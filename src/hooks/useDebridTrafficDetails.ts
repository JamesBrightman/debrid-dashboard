"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTrafficDetails } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { TrafficDetailsResponse } from "@/types/response/trafficDetailsResponse";

const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getLast7DaysRange = () => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);

  return {
    start: toLocalDateString(startDate),
    end: toLocalDateString(endDate),
  };
};

export const useDebridTrafficDetails = (): UseQueryResult<
  TrafficDetailsResponse,
  Error
> => {
  const { apiKey, hasKey } = useDebridApiKey();
  const range = getLast7DaysRange();

  return useQuery({
    queryKey: ["debrid", "trafficDetails", range.start, range.end],
    enabled: hasKey,
    queryFn: () => getTrafficDetails(apiKey, range.start, range.end),
  });
};
