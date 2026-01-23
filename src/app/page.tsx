import { KeyInput } from "@/components/KeyInput";
import { DebridSettings } from "@/components/DebridSettings";
import { DebridUser } from "@/components/DebridUser";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <KeyInput />
          <DebridSettings />
          <DebridUser />
        </div>
      </main>
    </div>
  );
}
