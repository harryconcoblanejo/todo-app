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

        // Devuelve el usuario para la sesión
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Cuando inicia sesión, agregar el id al token JWT
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Agregar el id al objeto session para usar en el cliente
      if (token) {
        session.user.id = token.id;
      }
      console.log("aqui estoy session", session);
      return await session;
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
