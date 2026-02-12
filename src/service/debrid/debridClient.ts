import axios from "axios";

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

export const getSettings = (token: string) => debridGet("/settings", token);

export const getUser = (token: string) => debridGet("/user", token);
