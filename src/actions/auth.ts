import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { turso } from "../turso";
import jwt from "jsonwebtoken";

export const auth = {
  login: defineAction({
    accept: "form",
    input: z.object({
      username: z.string().trim().min(1, "El nombre de usuario es obligatorio"),
      password: z.string().trim().min(1, "La contraseña es obligatoria"),
    }),
    handler: async (input, context) => {
      const { username, password } = input;

      if (!username || !password) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Nombre de usuario y contraseña son obligatorios",
        });
      }

      const result = await turso.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
      );

      if (result.rows.length === 0) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Nombre de usuario o contraseña incorrectos",
        });
      }

      const token = jwt.sign(
        { id: result.rows[0].id},
        import.meta.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      context.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour
      });
      return { success: true, message: "Inicio de sesión exitoso" };
    },
  }),
  logout: defineAction({
    handler: async (_input, context) => {
      context.cookies.delete("token", { path: "/" });
      return { success: true, message: "Cierre de sesión exitoso" };
    },
  }),
}
