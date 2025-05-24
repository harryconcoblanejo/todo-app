import LoginForm from "@/components/LoginForm";
import TaskCard from "@/components/taskCard";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

async function getTasks(userId) {
  return await prisma.task.findMany({
    where: { userId },
  });
}

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="container mx-auto p-4 mt-4">
        <LoginForm />
      </section>
    );
  }

  const data = await getTasks(session.user.id);

  return (
    <section className="container mx-auto border-2 border-slate-900 rounded-lg p-4 mt-4">
      {data.length === 0 ? (
        <Link
          className="text-center text-lg font-semibold coursor-pointer flex justify-center"
          href={"/new"}
        >
          Crear alguna tarea
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
