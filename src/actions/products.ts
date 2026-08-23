import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { turso } from "../turso";

export const products = {
  create: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().trim().min(1, "El nombre es requerido"),
      brand: z.string().trim().min(1, "La marca es requerida"),
      imei: z.coerce.number().min(1, "El IMEI es requerido"),
      price: z.coerce.number().min(1, "El precio es requerido"),
      stock: z.coerce.number().min(1, "El stock es requerido"),
      color: z.string().trim().min(1, "El color es requerido"),
      storage: z.string().trim().min(1, "El almacenamiento es requerido"),
      status: z.string().trim().min(1, "El estado es requerido")
    }),
    handler: async (input, context) => {
      const { name, brand, imei, price, stock, color, storage, status } = input;

      const { rows } = await turso.execute(
        "INSERT INTO products (name, brand, imei, price, stock, color, storage, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, brand, imei, price, stock, color, storage, status]
      );

      console.log(rows);
      return { success: true, message: "Producto creado exitosamente" };
    }
  })
};
