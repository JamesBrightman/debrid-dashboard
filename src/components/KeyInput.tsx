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
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <label htmlFor="debrid-key" className="block text-sm font-medium">
        Real-Debrid API token
      </label>
      <div className="flex gap-2">
        <input
          id="debrid-key"
          name="debrid_api_token"
          type={isVisible ? "text" : "password"}
          autoComplete={isVisible ? "off" : "new-password"}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-800 transition focus:ring-2"
          value={localKeyVal}
          onChange={(e) => setLocalKeyVal(e.target.value)}
          placeholder="Enter API token"
        />
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className="flex items-center justify-center rounded-md border border-zinc-300 px-3 py-2 transition hover:bg-zinc-100"
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
                isVisible ? "scale-40 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <Image
              src={eyeOpenIcon}
              alt="eye open icon"
              width={20}
              height={20}
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                isVisible ? "scale-100 opacity-100" : "scale-40 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>
      <button
        type="submit"
        disabled={!hasChanged}
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save token
      </button>
    </form>
  );
};
