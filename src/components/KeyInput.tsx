"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "ahooks";
import { useState } from "react";

export const KeyInput: React.FC = () => {
  const queryClient = useQueryClient();

  const [savedValue, setSavedValue] =
    useLocalStorageState<string>("debrid-key");

  const [localKeyVal, setLocalKeyVal] = useState<string>(savedValue ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedValue(localKeyVal);

    // Trigger refetches
    queryClient.invalidateQueries({ queryKey: ["debrid-settings"] });
    queryClient.invalidateQueries({ queryKey: ["debrid-user"] });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="outline-solid"
        value={localKeyVal}
        onChange={(e) => setLocalKeyVal(e.target.value)}
        placeholder="Enter API key"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
