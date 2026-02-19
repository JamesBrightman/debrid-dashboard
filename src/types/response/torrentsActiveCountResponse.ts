import { z } from "zod";

const countSchema = z.coerce.number().int().nonnegative().catch(0);

export const torrentsActiveCountResponseSchema = z.object({
  nb: countSchema,
  limit: countSchema,
});

export type TorrentsActiveCountResponse = z.infer<
  typeof torrentsActiveCountResponseSchema
>;
