"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TaskListDndKit from "@/components/TaskListDndKit";
import { useMenu } from "@/contexts/MenuContext";

// Carga dinámica del componente para evitar SSR y errores de hidratación
const TaskListDraggable = dynamic(() => import("@/components/TaskListDraggable"), { ssr: false });

const HomePageClient = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { menuOpen } = useMenu();

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || []);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh] w-full">
      <span className="inline-block w-10 h-10 border-4 border-slate-400 border-t-slate-900 rounded-full animate-spin" />
    </div>
  );
  if (tasks.length === 0) return <div className="text-center text-2xl font-bold text-slate-950">Create your first task!</div>;

  return (
    <div className={`transition-all duration-300 ${menuOpen ? 'mt-32 sm:mt-0' : 'mt-0'}`}>
      <TaskListDndKit tasks={tasks} />
    </div>
  );
};

export default HomePageClient;
