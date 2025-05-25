import { prisma } from "@/libs/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await context.params;
    const parsedId = parseInt(id, 10);
    console.log("ID:", parsedId);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { id: parsedId } });

    if (!task) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }
    if (task.userId !== parseInt(token.id, 10)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    return NextResponse.json({ msj: "Estás en la función GET", task });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener la tarea", detalle: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await context.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { id: parsedId } });
    if (!task || task.userId !== parseInt(token.id, 10)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const data = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id: parsedId },
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

export async function DELETE(req, context) {
  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await context.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { id: parsedId } });
    if (!task || task.userId !== parseInt(token.id, 10)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }
    const deletedTask = await prisma.task.delete({
      where: { id: parsedId },
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
