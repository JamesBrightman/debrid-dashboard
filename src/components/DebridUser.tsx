"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridUser } from "@/hooks/useDebridUser";

export const DebridUser: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridUser();

  if (!hasKey) {
    return (
      <section className="w-full rounded-lg border border-dashed border-zinc-300 p-4">
        <h2 className="text-base font-semibold">User</h2>
        <p className="mt-2 text-sm text-zinc-600">Add a token to load user info.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-lg border border-zinc-200 p-4">
        <h2 className="text-base font-semibold">User</h2>
        <p className="mt-2 text-sm text-zinc-600">Loading user...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-base font-semibold text-red-800">User</h2>
        <p className="mt-2 text-sm text-red-700">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-lg border border-zinc-200 p-4">
      <h2 className="text-base font-semibold">User</h2>
      <pre className="mt-3 overflow-x-auto rounded-md bg-zinc-950 p-3 text-xs text-zinc-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
};
