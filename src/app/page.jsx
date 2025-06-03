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
      <section className="container mx-auto p-4 mt-4 flex flex-col items-center justify-center min-h-[40vh]">
        <img src="/pexels-suzyhazelwood-1226398.jpg" alt="Welcome" className="max-w-3xl w-full rounded-lg shadow-lg" />
        <div className="mt-6 text-center bg-white/80 rounded-lg px-6 py-4 shadow">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to the task app</h1>
          <p className="text-slate-800">Create an account and start organizing your days!</p>
        </div>
      </section>
    );
  }

  const data = await getTasks(session.user.id);

  return (
<section className="relative w-full h-auto lg:h-[calc(100vh-90px)] flex items-center justify-center overflow-hidden">
  {/* Fondo de imagen */}
  <img
    src="/pexels-suzyhazelwood-1226398.jpg"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
  {/* Overlay de transparencia */}
  <div className="absolute inset-0 bg-black/40 z-10" />
  {/* Contenido principal */}
  <div className="relative z-20 w-full flex justify-center items-center min-h-[80vh] container mx-auto rounded-lg p-4 mt-4 bg-white/30 max-w-4xl">
    <HomePageClient />
  </div>
</section>

  );
};

export default HomePage;
