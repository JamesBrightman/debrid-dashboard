"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { deleteSettingsAvatar } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const useDeleteDebridAvatar = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();
  const { apiKey, hasKey } = useDebridApiKey();

  return useMutation({
    mutationKey: ["debrid", "deleteAvatar"],
    mutationFn: async () => {
      if (!hasKey) {
        throw new Error("Missing API key");
      }

      await deleteSettingsAvatar(apiKey);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["debrid", "user"],
      });
    },
  });
};
