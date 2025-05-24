import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json({
      msj: "Estás en la función GET desde backend",
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("DATA RECIBIDA EN EL SERVIDOR:", data);

    const { title, description, userId } = data;

    if (!userId) {
      return NextResponse.json(
        { error: "El campo userId es obligatorio" },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
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
