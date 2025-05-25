import LoginForm from "@/components/LoginForm";
import TaskCard from "@/components/taskCard";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

async function getTasks(userId) {
  console.log("a ver el userId", userId);
  if (!userId) return [];
  return await prisma.task.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: { createdAt: "desc" },
  });
}

const HomePage = async () => {
  console.log("flag1");
  const session = await getServerSession(authOptions);

  // Debug: muestra la sesión completa y el id del usuario
  console.log("session:", session);
  console.log("session.user?.id:", session?.user?.id);
  console.log("flag2");
  if (!session || !session.user?.id) {
    return (
      <section className="container mx-auto p-4 mt-4">
        <LoginForm />
      </section>
    );
  }
  console.log("flag3");
  const data = await getTasks(session.user.id);
  console.log("Tareas obtenidas:", data);
  console.log("flag4");
  return (
    <section className="container mx-auto border-2 border-slate-900 rounded-lg p-4 mt-4">
      {data.length === 0 ? (
        <Link
          className="text-center text-lg font-semibold coursor-pointer flex justify-center"
          href={"/new"}
        >
          Create Task
        </Link>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 items-center justify-center ">
          {data.map(task => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;
