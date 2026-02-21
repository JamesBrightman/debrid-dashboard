import axios from "axios";
import {
  serverTimeResponseSchema,
  type ServerTimeResponse,
} from "@/types/response/serverTimeResponse";
import {
  userResponseSchema,
  type UserResponse,
} from "@/types/response/userResponse";
import {
  trafficDetailsResponseSchema,
  type TrafficDetailsResponse,
} from "@/types/response/trafficDetailsResponse";
import {
  disableAccessTokenResponseSchema,
  type DisableAccessTokenResponse,
} from "@/types/response/disableAccessTokenResponse";
import {
  downloadsResponseSchema,
  type DownloadsResponse,
} from "@/types/response/downloadsResponse";
import {
  torrentsResponseSchema,
  type TorrentsResponse,
} from "@/types/response/torrentsResponse";
import {
  torrentsActiveCountResponseSchema,
  type TorrentsActiveCountResponse,
} from "@/types/response/torrentsActiveCountResponse";
import {
  hostsResponseSchema,
  type HostsResponse,
} from "@/types/response/hostsResponse";
import {
  hostsStatusResponseSchema,
  type HostsStatusResponse,
} from "@/types/response/hostsStatusResponse";
import {
  hostsDomainsResponseSchema,
  type HostsDomainsResponse,
} from "@/types/response/hostsDomainsResponse";

const debridClient = axios.create({
  baseURL: "https://api.real-debrid.com/rest/1.0",
  headers: {
    Accept: "application/json",
  },
});

const debridGet = async <T>(
  path: string,
  token: string,
  params?: Record<string, string | number>,
): Promise<T> => {
  const { data } = await debridClient.get<T>(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

const debridDelete = async (path: string, token: string): Promise<void> => {
  await debridClient.delete(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUser = async (token: string): Promise<UserResponse> => {
  const data = await debridGet("/user", token);

  return userResponseSchema.parse(data);
};

export const getTrafficDetails = async (
  token: string,
  start: string,
  end: string,
): Promise<TrafficDetailsResponse> => {
  const data = await debridGet("/traffic/details", token, { start, end });

  return trafficDetailsResponseSchema.parse(data);
};

export const getServerTime = async (): Promise<ServerTimeResponse> => {
  const { data } = await debridClient.get("/time/iso");

  return serverTimeResponseSchema.parse(data);
};

export const getDisableAccessToken = async (
  token: string,
): Promise<DisableAccessTokenResponse> => {
  const data = await debridGet("/disable_access_token", token);

  return disableAccessTokenResponseSchema.parse(data);
};

export const deleteSettingsAvatar = async (token: string): Promise<void> => {
  await debridDelete("/settings/avatarDelete", token);
};

type GetDownloadsOptions = {
  offset?: number;
  page?: number;
  limit?: number;
};

type ListRequestOptions = {
  offset?: number;
  page?: number;
  limit?: number;
};

const buildListRequestParams = (
  options?: ListRequestOptions,
): Record<string, number> | undefined => {
  const params: Record<string, number> = {};
  const limitInput = options?.limit;
  const pageInput = options?.page;
  const offsetInput = options?.offset;

  if (typeof limitInput === "number" && Number.isFinite(limitInput)) {
    params.limit = Math.min(5000, Math.max(0, Math.trunc(limitInput)));
  }

  if (typeof pageInput === "number" && Number.isFinite(pageInput)) {
    params.page = Math.max(0, Math.trunc(pageInput));
  } else if (typeof offsetInput === "number" && Number.isFinite(offsetInput)) {
    params.offset = Math.max(0, Math.trunc(offsetInput));
  }

  return Object.keys(params).length > 0 ? params : undefined;
};

export const getDownloads = async (
  token: string,
  options?: GetDownloadsOptions,
): Promise<DownloadsResponse> => {
  const data = await debridGet("/downloads", token, buildListRequestParams(options));

  return downloadsResponseSchema.parse(data);
};

export const deleteDownload = async (
  token: string,
  id: string,
): Promise<void> => {
  await debridDelete(`/downloads/delete/${encodeURIComponent(id)}`, token);
};

type GetTorrentsOptions = {
  offset?: number;
  page?: number;
  limit?: number;
  filter?: "active";
};

export const getTorrents = async (
  token: string,
  options?: GetTorrentsOptions,
): Promise<TorrentsResponse> => {
  const params: Record<string, string | number> = {
    ...(buildListRequestParams(options) ?? {}),
  };

  if (options?.filter === "active") {
    params.filter = "active";
  }

  const data = await debridGet(
    "/torrents",
    token,
    Object.keys(params).length > 0 ? params : undefined,
  );

  return torrentsResponseSchema.parse(data);
};

export const deleteTorrent = async (
  token: string,
  id: string,
): Promise<void> => {
  await debridDelete(`/torrents/delete/${encodeURIComponent(id)}`, token);
};

export const getTorrentsActiveCount = async (
  token: string,
): Promise<TorrentsActiveCountResponse> => {
  const data = await debridGet("/torrents/activeCount", token);

  return torrentsActiveCountResponseSchema.parse(data);
};

export const getHosts = async (): Promise<HostsResponse> => {
  const { data } = await debridClient.get("/hosts");

  return hostsResponseSchema.parse(data);
};

export const getHostsStatus = async (
  token: string,
): Promise<HostsStatusResponse> => {
  const data = await debridGet("/hosts/status", token);

  return hostsStatusResponseSchema.parse(data);
};

export const getHostsDomains = async (): Promise<HostsDomainsResponse> => {
  const { data } = await debridClient.get("/hosts/domains");

  return hostsDomainsResponseSchema.parse(data);
};
