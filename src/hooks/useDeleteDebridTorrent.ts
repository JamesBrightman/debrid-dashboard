"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { deleteTorrent } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const useDeleteDebridTorrent = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  const { apiKey, hasKey } = useDebridApiKey();

  return useMutation({
    mutationKey: ["debrid", "deleteTorrent"],
    mutationFn: async (id: string) => {
      if (!hasKey) {
        throw new Error("Missing API key");
      }

      await deleteTorrent(apiKey, id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["debrid", "torrents"],
      });
    },
  });
};
