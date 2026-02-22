"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import eyeClosedIcon from "@/assets/icons/eye-closed.svg";
import eyeOpenIcon from "@/assets/icons/eye-open.svg";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const KeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useDebridApiKey();
  const [localKeyVal, setLocalKeyVal] = useState(apiKey);
  const [isVisible, setIsVisible] = useState(false);
  const hasChanged = localKeyVal.trim() !== apiKey;

  useEffect(() => {
    setLocalKeyVal(apiKey);
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiKey(localKeyVal);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Hidden username field improves password-manager behavior for token input. */}
      <label htmlFor="debrid-username" className="sr-only">
        Username
      </label>
      <input
        id="debrid-username"
        name="username"
        type="text"
        autoComplete="username"
        className="sr-only"
        tabIndex={-1}
      />
      <div className="flex min-w-0 flex-nowrap items-stretch gap-2">
        <div className="relative min-w-0 flex-1">
          <input
            id="debrid-key"
            name="debrid_api_token"
            type={isVisible ? "text" : "password"}
            autoComplete={isVisible ? "off" : "new-password"}
            spellCheck={false}
            className="peer w-full rounded-xl border border-sky-300 bg-sky-50 px-3 pb-2.5 pt-5 text-sm text-slate-900 outline-none transition focus:border-coral-500 focus:ring-2 focus:ring-coral-300/40"
            value={localKeyVal}
            onChange={(e) => setLocalKeyVal(e.target.value)}
            placeholder=" "
          />
          <label
            htmlFor="debrid-key"
            className={`pointer-events-none absolute left-3 text-slate-600 transition-all duration-150 ${
              localKeyVal.trim()
                ? "top-1.5 text-[11px]"
                : "top-1/2 -translate-y-1/2 text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[11px]"
            }`}
          >
            Real-Debrid API token
          </label>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className="flex h-11 shrink-0 items-center justify-center rounded-xl border border-sky-300 bg-sky-50 px-3 py-2 transition hover:bg-coral-50"
          aria-label={isVisible ? "Hide API token" : "Show API token"}
        >
          <span className="relative block w-5 h-5">
            <Image
              src={eyeClosedIcon}
              alt="eye closed icon"
              width={20}
              height={20}
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                isVisible ? "scale-50 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <Image
              src={eyeOpenIcon}
              alt="eye open icon"
              width={20}
              height={20}
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </span>
        </button>
        <button
          type="submit"
          disabled={!hasChanged}
          className="h-11 shrink-0 rounded-xl border border-ocean-700 bg-ocean-600 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-ocean-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
