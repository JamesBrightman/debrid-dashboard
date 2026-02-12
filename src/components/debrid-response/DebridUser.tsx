"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridUser } from "@/hooks/useDebridUser";

export const DebridUser: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridUser();

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          User
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Add a token to load user info.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
        <h2 className="text-base font-semibold text-[color:var(--foreground)]">
          User
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Loading user...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-[#ffd5cc] bg-[color:var(--accent-coral-soft)] p-4">
        <h2 className="text-base font-semibold text-[#a5402a]">User</h2>
        <p className="mt-2 text-sm text-[#a5402a]">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
      <h2 className="text-base font-semibold text-[color:var(--foreground)]">
        User
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-3 text-xs text-zinc-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
};
