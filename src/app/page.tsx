import { KeyInput } from "@/components/KeyInput";
import { DebridSettings } from "@/components/debrid-response/DebridSettings";
import { DebridUser } from "@/components/debrid-response/DebridUser";
import { UserSummary } from "@/components/UserSummary";

export default function Home() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <main className="mx-auto w-full max-w-3xl space-y-6">
        <section className="card-shell p-6 sm:p-8">
          <KeyInput />
        </section>

        <UserSummary />
      </main>

      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <div className="card-shell p-6 sm:p-8">
          <DebridUser />
        </div>
        <div className="card-shell p-6 sm:p-8">
          <DebridSettings />
        </div>
      </section>
    </div>
  );
}
