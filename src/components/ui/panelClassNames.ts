export const panelClassNames = {
  dashed:
    "w-full rounded-xl border border-dashed border-sky-300 bg-sky-50 p-4 shadow-card",
  default: "w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card",
  error:
    "w-full rounded-xl border border-coral-200 bg-coral-50 p-4 shadow-card-coral",
  insight:
    "w-full rounded-[1.4rem] border border-ocean-100 bg-gradient-to-br from-white to-ocean-50 p-5 shadow-card",
  insightError:
    "w-full rounded-[1.4rem] border border-coral-200 bg-gradient-to-br from-coral-50 to-coral-100 p-5 shadow-card-coral",
  insightFill:
    "flex h-full w-full flex-col rounded-[1.4rem] border border-ocean-100 bg-gradient-to-br from-white to-ocean-50 p-5 shadow-card",
  insightFillError:
    "flex h-full w-full flex-col rounded-[1.4rem] border border-coral-200 bg-gradient-to-br from-coral-50 to-coral-100 p-5 shadow-card-coral",
} as const;
