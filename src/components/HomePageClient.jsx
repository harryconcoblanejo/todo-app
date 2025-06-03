"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TaskListDndKit from "@/components/TaskListDndKit";

// Carga dinámica del componente para evitar SSR y errores de hidratación
const TaskListDraggable = dynamic(() => import("@/components/TaskListDraggable"), { ssr: false });

const HomePageClient = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  if (tasks.length === 0) return <div>No hay tareas</div>;

  return <TaskListDndKit tasks={tasks} />;
};

export default HomePageClient;
