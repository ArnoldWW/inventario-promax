import { z } from "astro/zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  imei: z.string(),
  color: z.string(),
  storage: z.string(),
  provider: z.string(),
  battery: z.number().min(0).max(100),
  created_at: z.string(),
  status: z.string(),
  dollar_cop: z.number(),
  price_usd: z.number(),
  origin: z.string(),
  price_cop: z.number()
});
export type Product = z.infer<typeof productSchema>;
