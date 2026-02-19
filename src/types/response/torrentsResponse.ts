import { z } from "zod";

const torrentNumberSchema = z.coerce.number().int().nonnegative().catch(0);
const torrentProgressSchema = z
  .coerce.number()
  .int()
  .catch(0)
  .transform((value) => Math.min(100, Math.max(0, value)));

const torrentStatusKnownSchema = z.enum([
  "magnet_error",
  "magnet_conversion",
  "waiting_files_selection",
  "queued",
  "downloading",
  "downloaded",
  "error",
  "virus",
  "compressing",
  "uploading",
  "dead",
]);

export const torrentItemSchema = z.object({
  id: z.string(),
  filename: z.string(),
  hash: z.string(),
  bytes: torrentNumberSchema,
  host: z.string(),
  split: torrentNumberSchema,
  progress: torrentProgressSchema,
  status: z.union([torrentStatusKnownSchema, z.string()]),
  added: z.string(),
  links: z.array(z.string()).catch([]),
  ended: z.string().optional(),
  speed: torrentNumberSchema.optional(),
  seeders: torrentNumberSchema.optional(),
});

export const torrentsResponseSchema = z.array(torrentItemSchema);

export type TorrentItem = z.infer<typeof torrentItemSchema>;
export type TorrentsResponse = z.infer<typeof torrentsResponseSchema>;
