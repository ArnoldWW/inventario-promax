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
        .string()
        .trim()
        .length(15, "El IMEI debe tener 15 dígitos")
        .regex(/^\d+$/, "El IMEI debe contener solo números"),
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
  }),
  update: defineAction({
    accept: "form",
    input: z.object({
      id: z.string().trim().min(1, "El ID es requerido"),
      name: z.string().trim().min(1, "El nombre es requerido"),
      brand: z.string().trim().min(1, "La marca es requerida"),
      imei: z.coerce
        .string()
        .trim()
        .length(15, "El IMEI debe tener 15 dígitos")
        .regex(/^\d+$/, "El IMEI debe contener solo números"),
      color: z.string().trim().min(1, "El color es requerido"),
      storage: z.string().trim().min(1, "El almacenamiento es requerido"),
      status: z.string().trim().min(1, "El estado es requerido")
    }),
    handler: async (input, context) => {
      const { id, name, brand, imei, color, storage, status } = input;

      const { rows } = await turso.execute(
        "UPDATE products SET name = ?, brand = ?, imei = ?, color = ?, storage = ?, status = ? WHERE id = ?",
        [name, brand, imei, color, storage, status, id]
      );

      console.log(rows);
      return { success: true, message: "Producto actualizado exitosamente" };
    }
  }),
  DELETE: defineAction({
    accept: "form",
    input: z.object({
      id: z.string().trim().min(1, "El ID es requerido")
    }),
    handler: async (input, context) => {
      const { id } = input;

      const { rows } = await turso.execute(
        "DELETE FROM products WHERE id = ?",
        [id]
      );

      console.log(rows);
      return { success: true, message: "Producto eliminado exitosamente" };
    }
  })
};
