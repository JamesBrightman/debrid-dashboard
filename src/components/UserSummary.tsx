"use client";

import { useDebridUser } from "@/hooks/useDebridUser";
import { UserStatusBadge } from "@/components/UserStatusBadge";
import { UserType, type UserResponse } from "@/types/response/userResponse";

export const UserSummary: React.FC = () => {
  const { data } = useDebridUser();
  const user = data as UserResponse | undefined;

  if (!user) {
    return null;
  }

  const username = user.username?.trim();

  const isPremium = user.type === UserType.premium;

  const hasAvatar = typeof user.avatar === "string" && user.avatar.length > 0;

  const premiumDaysLeft =
    typeof user.premium === "number"
      ? Math.max(0, Math.ceil(user.premium / 86400))
      : null;

  const expirationDate =
    typeof user.expiration === "string" && user.expiration.length > 0
      ? (() => {
          const date = new Date(user.expiration);

          return Number.isNaN(date.getTime())
            ? null
            : date.toISOString().slice(0, 10);
        })()
      : null;

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-sky-300 bg-gradient-to-br from-slate-100 to-sky-100 p-6 shadow-card sm:p-8">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-coral-50 blur-xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          <UserStatusBadge isPremium={isPremium} />
          <h2 className="break-words text-xl font-semibold text-slate-900">
            Welcome{username ? `, ${username}` : ""}
          </h2>
          <div className="space-y-1 text-sm text-slate-600">
            <p className="break-all">{user.email ?? "-"}</p>
            <p>Points: {user.points ?? "-"}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{expirationDate ?? "-"}</span>
              <span>
                (
                {premiumDaysLeft === null
                  ? "-"
                  : `${premiumDaysLeft} ${
                      premiumDaysLeft === 1 ? "Day" : "Days"
                    } left`}
                )
              </span>
            </div>
          </div>
        </div>

        <div className="h-11 w-11 shrink-0 rounded-full border-2 border-white bg-sky-50 shadow-sm sm:h-14 sm:w-14">
          {hasAvatar ? (
            <div
              className="h-full w-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${user.avatar})` }}
              role="img"
              aria-label={`${username ?? "User"} avatar`}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};



