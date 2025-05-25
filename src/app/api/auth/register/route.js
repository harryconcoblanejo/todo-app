import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Faltan datos" }), {
        status: 400,
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "El usuario ya existe" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: "Usuario creado" }), {
      status: 201,
    });
  } catch (error) {
    console.log("error creando usuario", error);
    return new Response(
      JSON.stringify({ message: "Error interno", detail: error.message }),
      {
        status: 500,
      }
    );
  }
}
