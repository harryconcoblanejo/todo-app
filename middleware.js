import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicPaths = [
    "/login",
    "/api/auth",
    "/api/auth/signin",
    "/api/auth/callback",
    "/favicon.ico",
    "/_next/",
  ];

  // Si la ruta está en paths públicos, pasa sin token
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir a login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token, dejar pasar
  return NextResponse.next();
}
