"use client";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { getDisableAccessToken } from "@/service/debrid/debridClient";
import { debridMutationKeys } from "@/service/debrid/queryKeys";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { DisableAccessTokenResponse } from "@/types/response/disableAccessTokenResponse";

export const useDisableAccessToken = (): UseMutationResult<
  DisableAccessTokenResponse,
  Error,
  void
> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useMutation({
    mutationKey: debridMutationKeys.disableAccessToken,
    mutationFn: async () => {
      if (!hasKey) {
        throw new Error("Missing API key");
      }

      return getDisableAccessToken(apiKey);
    },
  });
};
