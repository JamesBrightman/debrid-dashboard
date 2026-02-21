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
        <div className="grid w-full items-start gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <DebridDownloads />
          </div>
          <div className="lg:col-span-2">
            <DebridTorrents />
          </div>
          <div className="lg:col-span-2">
            <DebridHosts />
          </div>
          <div className="lg:col-span-2">
            <DebridHostsStatus />
          </div>
          <div className="lg:col-span-2">
            <DebridHostsDomains />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <DangerZone />
      </section>
    </div>
  );
}
