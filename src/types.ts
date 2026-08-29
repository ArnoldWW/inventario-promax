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
  status: z.string(),
  dollar_cop: z.number().positive(),
  price_usd: z.number().positive()
});
export type Product = z.infer<typeof productSchema>;
