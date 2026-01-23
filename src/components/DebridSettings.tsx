"use client";

import { useDebridSettings } from "@/hooks/useDebridSettings";

export const DebridSettings: React.FC = () => {
  const { data, isLoading, error } = useDebridSettings();

  if (isLoading) return <div>Loading settings...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Debrid Settings</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};