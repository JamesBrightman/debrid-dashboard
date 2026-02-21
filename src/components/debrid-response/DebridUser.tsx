"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridUser } from "@/hooks/useDebridUser";
import { Card } from "@/components/ui/Card";

export const DebridUser: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridUser();

  if (!hasKey) {
    return (
      <Card variant="dashed">
        <h2 className="text-base font-semibold text-slate-900">
          User
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load user info.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="default">
        <h2 className="text-base font-semibold text-slate-900">
          User
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading user...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="error">
        <h2 className="text-base font-semibold text-coral-800">User</h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </Card>
    );
  }

  return (
    <Card variant="default">
      <h2 className="text-base font-semibold text-slate-900">
        User
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-3 text-xs text-zinc-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </Card>
  );
};



