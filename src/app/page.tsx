import { KeyInput } from "@/components/KeyInput";
import { DebridSettings } from "@/components/DebridSettings";
import { DebridUser } from "@/components/DebridUser";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10 sm:px-6">
      <main className="mx-auto w-full max-w-3xl space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Debrid Client</h1>
          <p className="text-sm text-zinc-600">
            Store your token locally and fetch data from the Real-Debrid API.
          </p>
        </div>
        <section className="rounded-lg border border-zinc-200 p-4">
          <KeyInput />
        </section>
        <DebridUser />
        <DebridSettings />
      </main>
    </div>
  );
}
