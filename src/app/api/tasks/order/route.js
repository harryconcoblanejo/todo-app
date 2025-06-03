import { prisma } from "@/libs/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function PUT(req) {

  try {
    const token = await getToken({ req });
    if (!token || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { tasks } = await req.json(); // [{id, order}, ...]
    for (const t of tasks) {
      await prisma.task.update({
        where: { id: t.id },
        data: { order: t.order },
      });
    }
    return NextResponse.json({ msj: "Orden actualizado" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al actualizar el orden", detalle: error.message },
      { status: 500 }
    );
  }

}