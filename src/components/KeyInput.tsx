"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const KeyInput: React.FC = () => {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("debrid-key", value);

    // Invalidate the debrid-settings query to trigger a refetch
    queryClient.invalidateQueries({ queryKey: ["debrid-settings"] });

    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="outline-solid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};