import { z } from "zod";

export const disableAccessTokenResponseSchema = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => value ?? "");

export type DisableAccessTokenResponse = z.infer<
  typeof disableAccessTokenResponseSchema
>;
