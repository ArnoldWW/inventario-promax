import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { turso } from "../turso";

export const sales = {
  create: defineAction({
    accept: "form",
    input: z.object({}),
    handler: async (data) => {
      console.log(data);
    }
  })
};
