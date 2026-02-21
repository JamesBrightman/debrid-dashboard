import { DebridInsightsLayout } from "@/components/compound-layouts/DebridInsightsLayout";
import { DangerZone } from "@/components/danger-zone/DangerZone";
import { DebridDownloads } from "@/components/debrid-response/DebridDownloads";
import { DebridHosts } from "@/components/debrid-response/DebridHosts";
import { DebridHostsDomains } from "@/components/debrid-response/DebridHostsDomains";
import { DebridHostsStatus } from "@/components/debrid-response/DebridHostsStatus";
import { DebridTorrents } from "@/components/debrid-response/DebridTorrents";
import { UserSummary } from "@/components/UserSummary";

export default function Home() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <main className="mx-auto w-full max-w-3xl space-y-6">
        <UserSummary />
      </main>

      <section className="mx-auto w-full max-w-6xl space-y-6">
        <DebridInsightsLayout />
        <div className="space-y-6">
          <DebridDownloads />
          <DebridTorrents />
          <DebridHosts />
          <DebridHostsStatus />
          <DebridHostsDomains />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <DangerZone />
      </section>
    </div>
  );
}
