import { z } from "zod";

const trafficDetailsNumberSchema = z.coerce.number().int().nonnegative().catch(0);

export const trafficDetailsDaySchema = z.object({
  host: z.record(z.string(), trafficDetailsNumberSchema).catch({}),
  bytes: trafficDetailsNumberSchema,
});

export const trafficDetailsResponseSchema = z.record(
  z.string(),
  trafficDetailsDaySchema,
);

export type TrafficDetailsResponse = z.infer<typeof trafficDetailsResponseSchema>;
