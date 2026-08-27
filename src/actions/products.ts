import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { turso } from "../turso";

export const products = {
  create: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().trim().min(1, "El nombre es requerido"),
      brand: z.string().trim().min(1, "La marca es requerida"),
      imei: z.coerce
        .number()
        .min(15, "El IMEI debe tener 15 dígitos")
        .max(15, "El IMEI debe tener 15 dígitos"),
      price: z.coerce.number().min(1, "El precio es requerido"),
      color: z.string().trim().min(1, "El color es requerido"),
      storage: z.string().trim().min(1, "El almacenamiento es requerido"),
      status: z.string().trim().min(1, "El estado es requerido"),
      price_usd: z.coerce.number().min(1, "El precio en USD es requerido")
    }),
    handler: async (input, context) => {
      const { name, brand, imei, price, color, storage, status, price_usd } =
        input;
      const id = crypto.randomUUID();

      const { rows } = await turso.execute(
        "INSERT INTO products (id, name, brand, imei, price, color, storage, status, price_usd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, name, brand, imei, price, color, storage, status, price_usd]
      );

      console.log(rows);
      return { success: true, message: "Producto creado exitosamente" };
    }
  })
};
