import { z } from "zod";

const downloadNumberSchema = z.coerce.number().int().nonnegative().catch(0);

export const downloadItemSchema = z.object({
  id: z.string(),
  filename: z.string(),
  mimeType: z.string(),
  filesize: downloadNumberSchema,
  link: z.string(),
  host: z.string(),
  chunks: downloadNumberSchema,
  download: z.string(),
  generated: z.string(),
  type: z.string().optional(),
});

export const downloadsResponseSchema = z.array(downloadItemSchema);

export type DownloadItem = z.infer<typeof downloadItemSchema>;
export type DownloadsResponse = z.infer<typeof downloadsResponseSchema>;
