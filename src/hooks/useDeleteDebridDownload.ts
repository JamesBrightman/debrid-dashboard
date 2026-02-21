"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { deleteDownload } from "@/service/debrid/debridClient";
import { debridMutationKeys, debridQueryKeys } from "@/service/debrid/queryKeys";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const useDeleteDebridDownload = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  const { apiKey, hasKey } = useDebridApiKey();

  return useMutation({
    mutationKey: debridMutationKeys.deleteDownload,
    mutationFn: async (id: string) => {
      if (!hasKey) {
        throw new Error("Missing API key");
      }

      await deleteDownload(apiKey, id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: debridQueryKeys.downloads,
      });
    },
  });
};
