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
      dollar_cop: z.coerce
        .number(),
      color: z.string().trim().min(1, "El color es requerido"),
      storage: z.string().trim().min(1, "El almacenamiento es requerido"),
      status: z.string().trim().min(1, "El estado es requerido"),
      price_usd: z.coerce.number(),
      battery: z.coerce
        .number()
        .min(1, "El porcentaje de batería es requerido"),
      provider: z.string().trim().min(1, "El proveedor es requerido"),
      origin: z.string().trim().min(1, "El origen es requerido"),
      price_cop: z.coerce.number()
    }),
    handler: async (input, context) => {
      const {
        name,
        brand,
        imei,
        dollar_cop,
        color,
        storage,
        status,
        price_usd,
        battery,
        provider,
        origin,
        price_cop
      } = input;
      const id = crypto.randomUUID();

      console.log(price_usd, dollar_cop);

      const { rows } = await turso.execute(
        "INSERT INTO products (id, name, brand, imei, dollar_cop, color, storage, status, price_usd, battery, provider, origin, price_cop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          name,
          brand,
          imei,
          dollar_cop,
          color,
          storage,
          status,
          price_usd,
          battery,
          provider,
          origin,
          price_cop
        ]
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
      status: z.string().trim().min(1, "El estado es requerido"),
      battery: z.coerce
        .number()
        .min(1, "El porcentaje de batería es requerido"),
      provider: z.string().trim().min(1, "El proveedor es requerido")
    }),
    handler: async (input, context) => {
      const {
        id,
        name,
        brand,
        imei,
        color,
        storage,
        status,
        battery,
        provider
      } = input;

      const { rows } = await turso.execute(
        "UPDATE products SET name = ?, brand = ?, imei = ?, color = ?, storage = ?, status = ?, battery = ?, provider = ? WHERE id = ?",
        [name, brand, imei, color, storage, status, battery, provider, id]
      );

      console.log(rows);
      return { success: true, message: "Producto actualizado exitosamente" };
    }
  }),
  delete: defineAction({
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
