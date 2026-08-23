import type { APIContext, MiddlewareNext } from "astro";
import jwt from "jsonwebtoken";

export function onRequest(context: APIContext, next: MiddlewareNext) {
  const protectedRoutes = ["/products", "/sales"];
  const path = new URL(context.request.url).pathname;

  if (path === "/") {
    const token = context.cookies.get("token")?.value;

    if (token) {
      try {
        const user = jwt.verify(token, import.meta.env.JWT_SECRET);
        context.locals.user = user;
        return context.redirect("/products");
      } catch (err) {
        context.cookies.delete("token");
        return next();
      }
    } else {
      return next();
    }
  }

  if (!protectedRoutes.some(p => path.startsWith(p))) {
    return next();
  }

  const token = context.cookies.get("token")?.value;

  if (!token) {
    return context.redirect("/");
  }

  try {
    const user = jwt.verify(token, import.meta.env.JWT_SECRET);
    console.log(user)
    context.locals.user = user;
    return next();
  } catch (err) {
    context.cookies.delete("token");
    return context.redirect("/");
  }
}
