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
  disableAccessTokenResponseSchema,
  type DisableAccessTokenResponse,
} from "@/types/response/disableAccessTokenResponse";

const debridClient = axios.create({
  baseURL: "https://api.real-debrid.com/rest/1.0",
  headers: {
    Accept: "application/json",
  },
});

const debridGet = async <T>(path: string, token: string): Promise<T> => {
  const { data } = await debridClient.get<T>(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getSettings = async (token: string): Promise<SettingsResponse> => {
  const data = await debridGet<unknown>("/settings", token);

  return settingsResponseSchema.parse(data);
};

export const getUser = async (token: string): Promise<UserResponse> => {
  const data = await debridGet<unknown>("/user", token);

  return userResponseSchema.parse(data);
};

export const getServerTime = async (): Promise<ServerTimeResponse> => {
  const { data } = await debridClient.get<unknown>("/time/iso");

  return serverTimeResponseSchema.parse(data);
};

export const getDisableAccessToken = async (
  token: string,
): Promise<DisableAccessTokenResponse> => {
  const data = await debridGet<unknown>("/disable_access_token", token);

  return disableAccessTokenResponseSchema.parse(data);
};
