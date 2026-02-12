"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridSettings } from "@/hooks/useDebridSettings";

export const DebridSettings: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridSettings();

  if (!hasKey) {
    return (
      <section className="w-full rounded-lg border border-dashed border-zinc-300 p-4">
        <h2 className="text-base font-semibold">Settings</h2>
        <p className="mt-2 text-sm text-zinc-600">Add a token to load settings.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-lg border border-zinc-200 p-4">
        <h2 className="text-base font-semibold">Settings</h2>
        <p className="mt-2 text-sm text-zinc-600">Loading settings...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-base font-semibold text-red-800">Settings</h2>
        <p className="mt-2 text-sm text-red-700">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-lg border border-zinc-200 p-4">
      <h2 className="text-base font-semibold">Settings</h2>
      <pre className="mt-3 overflow-x-auto rounded-md bg-zinc-950 p-3 text-xs text-zinc-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
};
