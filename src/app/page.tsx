import { KeyInput } from "@/components/KeyInput";
import { DebridSettings } from "@/components/DebridSettings";
import { DebridUser } from "@/components/DebridUser";

export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <main className="mx-auto w-full max-w-3xl space-y-6">
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <KeyInput />
        </section>

        <section className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <DebridUser />
          <DebridSettings />
        </section>
      </main>
    </div>
  );
}
