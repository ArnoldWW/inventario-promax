import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { turso } from "../turso";

export const sales = {
  create: defineAction({
    accept: "form",
    input: z.object({
      product_id: z.string(),
      customer_name: z.string().trim(),
      price: z.number(),
      notes: z.string().trim().optional(),
    }),
    handler: async (input) => {
      const { product_id, customer_name, price, notes } = input;
      const id = crypto.randomUUID();

      await turso.execute(
        "INSERT INTO sales (id, product_id, customer_name, price, notes) VALUES (?, ?, ?, ?, ?)",
        [id, product_id, customer_name, price, notes ? notes : ""]
      );

      return { success: true, message: "Venta creada!" };
    }
  }),
  cancel: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      const { id } = input;

      await turso.execute("DELETE FROM sales WHERE id = ?", [id]);

      return { success: true, message: "Venta eliminada!" };
    }
  })
};
