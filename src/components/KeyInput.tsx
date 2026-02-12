"use client";

import { useEffect, useState } from "react";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const KeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useDebridApiKey();
  const [localKeyVal, setLocalKeyVal] = useState(apiKey);
  const hasChanged = localKeyVal.trim() !== apiKey;

  useEffect(() => {
    setLocalKeyVal(apiKey);
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiKey(localKeyVal);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <label htmlFor="debrid-key" className="block text-sm font-medium">
        Real-Debrid API token
      </label>
      <input
        id="debrid-key"
        type="password"
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-800 transition focus:ring-2"
        value={localKeyVal}
        onChange={(e) => setLocalKeyVal(e.target.value)}
        placeholder="Enter API token"
      />
      <button
        type="submit"
        disabled={!hasChanged}
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save token
      </button>
    </form>
  );
};
