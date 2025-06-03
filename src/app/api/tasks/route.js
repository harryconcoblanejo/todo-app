import { prisma } from "@/libs/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(token.id, 10) },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      msj: "Estás en la función GET desde backend",
      tasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const data = await req.json();
    console.log("DATA RECIBIDA EN EL SERVIDOR (ignora userId):", data);

    const { title, description, color } = data;
    const userId = parseInt(token.id, 10);

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        color, // Permite crear tarea con color si se provee
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json({
      msj: "Tarea creada correctamente",
      task: newTask,
    });
  } catch (error) {
    console.error("Error en POST /tasks:", error);
    return NextResponse.json(
      { error: "Error al crear tarea: " + error.message },
      { status: 500 }
    );
  }
}

// export async function PUT(req) {
//   return NextResponse.json({
//     msj: "Estás en la función PUT (actualizar tarea)",
//   });
// }

// export async function DELETE(req) {
//   return NextResponse.json({
//     msj: "Estás en la función DELETE (eliminar tarea)",
//   });
// }
