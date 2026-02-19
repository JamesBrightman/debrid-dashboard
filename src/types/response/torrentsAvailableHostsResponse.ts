import { z } from "zod";

const hostSizeSchema = z.coerce.number().int().nonnegative().catch(0);

export const torrentAvailableHostSchema = z.object({
  host: z.string(),
  max_file_size: hostSizeSchema,
});

export const torrentsAvailableHostsResponseSchema = z.array(
  torrentAvailableHostSchema,
);

export type TorrentAvailableHost = z.infer<typeof torrentAvailableHostSchema>;
export type TorrentsAvailableHostsResponse = z.infer<
  typeof torrentsAvailableHostsResponseSchema
>;
