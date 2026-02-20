import { DebridHostsSummary } from "@/components/debrid-response/DebridHostsSummary";
import { DebridTrafficDetails } from "@/components/debrid-response/DebridTrafficDetails";
import { DebridTorrentsActiveCount } from "@/components/debrid-response/DebridTorrentsActiveCount";
import { DebridUser } from "@/components/debrid-response/DebridUser";

export const DebridInsightsLayout: React.FC = () => {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2 lg:items-stretch">
      <div className="order-2 space-y-6 lg:order-1">
        <DebridHostsSummary />
        <DebridTorrentsActiveCount />
        <DebridUser />
      </div>
      <div className="order-1 h-full lg:order-2">
        <DebridTrafficDetails />
      </div>
    </div>
  );
};
