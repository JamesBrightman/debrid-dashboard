export const debridQueryKeys = {
  base: ["debrid"] as const,
  downloads: ["debrid", "downloads"] as const,
  hosts: ["debrid", "hosts"] as const,
  hostsDomains: ["debrid", "hosts", "domains"] as const,
  hostsStatus: ["debrid", "hosts", "status"] as const,
  serverTime: ["debrid", "serverTime"] as const,
  torrents: ["debrid", "torrents"] as const,
  torrentsActiveCount: ["debrid", "torrents", "activeCount"] as const,
  user: ["debrid", "user"] as const,
  trafficDetails: (start: string, end: string) =>
    ["debrid", "trafficDetails", start, end] as const,
} as const;

export const debridMutationKeys = {
  deleteAvatar: ["debrid", "deleteAvatar"] as const,
  deleteDownload: ["debrid", "deleteDownload"] as const,
  deleteTorrent: ["debrid", "deleteTorrent"] as const,
  disableAccessToken: ["debrid", "disableAccessToken"] as const,
} as const;
