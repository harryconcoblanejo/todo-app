import LoginForm from "@/components/LoginForm";
import HomePageClient from "@/components/HomePageClient";
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
    orderBy: { order: "asc" }, // Ordenar por el campo 'order'
  });
}

const HomePage = async () => {
  console.log("flag1");
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return (
      <section className="container mx-auto p-4 mt-4">
        <LoginForm />
      </section>
    );
  }

  const data = await getTasks(session.user.id);

  return (
    <section className="container mx-auto border-2 border-slate-900 rounded-lg p-4 mt-4">
      <HomePageClient />
    </section>
  );
};

export default HomePage;
