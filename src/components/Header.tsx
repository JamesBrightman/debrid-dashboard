import { KeyInput } from "./KeyInput";
import { DebridServerTime } from "./debrid-response/DebridServerTime";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-sky-300 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 md:flex-row md:items-stretch md:justify-between md:gap-6">
        <div className="flex flex-col md:min-w-0">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              Debrid Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Insights from real-debrid API
            </p>
          </div>
          <div className="md:mt-auto md:pt-4">
            <DebridServerTime />
          </div>
        </div>

        <div className="w-full md:max-w-md">
          <KeyInput />
        </div>
      </div>
    </header>
  );
};
