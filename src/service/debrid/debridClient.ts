"use server";

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
  settingsResponseSchema,
  type SettingsResponse,
} from "@/types/response/settingsResponse";
import {
  trafficResponseSchema,
  type TrafficResponse,
} from "@/types/response/trafficResponse";
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

export const getSettings = async (token: string): Promise<SettingsResponse> => {
  const data = await debridGet("/settings", token);

  return settingsResponseSchema.parse(data);
};

export const getUser = async (token: string): Promise<UserResponse> => {
  const data = await debridGet("/user", token);

  return userResponseSchema.parse(data);
};

export const getTraffic = async (token: string): Promise<TrafficResponse> => {
  const data = await debridGet("/traffic", token);

  return trafficResponseSchema.parse(data);
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

type GetDownloadsOptions = {
  offset?: number;
  page?: number;
  limit?: number;
};

export const getDownloads = async (
  token: string,
  options?: GetDownloadsOptions,
): Promise<DownloadsResponse> => {
  const rawLimit = Number.isFinite(options?.limit) ? options.limit! : 20;
  const limit = Math.min(5000, Math.max(0, Math.trunc(rawLimit)));

  const params: Record<string, number> = { limit };
  if (Number.isFinite(options?.page)) {
    params.page = Math.max(0, Math.trunc(options.page!));
  } else if (Number.isFinite(options?.offset)) {
    params.offset = Math.max(0, Math.trunc(options.offset!));
  }

  const data = await debridGet("/downloads", token, params);

  return downloadsResponseSchema.parse(data);
};

export const deleteDownload = async (
  token: string,
  id: string,
): Promise<void> => {
  await debridDelete(`/downloads/delete/${encodeURIComponent(id)}`, token);
};
