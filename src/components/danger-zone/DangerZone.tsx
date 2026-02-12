import { DebridDisableAccessToken } from "@/components/debrid-response/DebridDisableAccessToken";

export const DangerZone: React.FC = () => {
  return (
    <section className="flex flex-col gap-2 rounded-xl border border-red-500/40 bg-red-500/5 p-4">
      <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
      <div className="mt-4">
        <DebridDisableAccessToken />
      </div>
    </section>
  );
};
