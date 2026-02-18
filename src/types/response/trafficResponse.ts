import { z } from "zod";

const trafficTypeKnownSchema = z.enum(["links", "gigabytes", "bytes"]);
const trafficResetKnownSchema = z.enum(["daily", "weekly", "monthly"]);

const trafficNumberSchema = z.coerce.number().int().nonnegative().catch(0);

export const trafficTypeSchema = z.union([trafficTypeKnownSchema, z.string()]);
export const trafficResetSchema = z.union([
  trafficResetKnownSchema,
  z.string(),
]).catch("unknown");

export const trafficHostSchema = z.object({
  left: trafficNumberSchema,
  bytes: trafficNumberSchema,
  links: trafficNumberSchema,
  limit: trafficNumberSchema,
  type: trafficTypeSchema,
  extra: trafficNumberSchema,
  reset: trafficResetSchema,
});

export const trafficResponseSchema = z.record(z.string(), trafficHostSchema);

export type TrafficResponse = z.infer<typeof trafficResponseSchema>;
