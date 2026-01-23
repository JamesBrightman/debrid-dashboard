"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/service/debrid/debridClient";

export const useDebridSettings = () => {
  return useQuery({
    queryKey: ["debrid-settings"],
    queryFn: getSettings,
    retry: 1
  });
};