import { prisma } from "@/libs/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Buscar usuario por email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        // Verificar contraseña (asumiendo que está hasheada con bcrypt)
        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        // Devuelve el usuario completo para la sesión
        return {
          id: user.id,
          email: user.email,
          name: user.name, // Incluye el nombre si existe
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.picture = user.image ?? null;
      }

      console.log("jwt token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("session callback - token:", token);

      return {
        user: {
          name: token.name ?? null,
          email: token.email,
          image: token.picture ?? null,
          id: token.id, // ← el campo que necesitás
        },
        expires: session.expires,
      };
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // Ruta personalizada de login
  },

  secret: process.env.NEXTAUTH_SECRET, // Define en .env
};

const handler = await NextAuth(authOptions);
export { handler as GET, handler as POST };
