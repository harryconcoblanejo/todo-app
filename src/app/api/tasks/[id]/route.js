import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    console.log("ID:", id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ msj: "Estás en la función GET", task });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener la tarea", detalle: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const data = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      msj: "Estás en la función PUT",
      task: updatedTask,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar la tarea", detalle: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({
      msj: `Tarea eliminada: ${deletedTask.title}`,
      task: deletedTask,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar la tarea", detalle: error.message },
      { status: 500 }
    );
  }
}
