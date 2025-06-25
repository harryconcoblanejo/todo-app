"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const NewPage = ({ params }) => {
  console.log("flag2");
  const { id } = use(params); // 👈 desempaquetamos el Promise con `use()`
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id); // Solo true si hay ID (edición)

  useEffect(() => {
    if (!id) {
      console.warn("ID is undefined");
      return;
    }

    console.log("Fetching ID:", id);

    const getTaskData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Error al obtener la tarea");

        const data = await res.json();
        setTitle(data.task.title);
        setDescription(data.task.description);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Error al cargar la tarea");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    getTaskData();
  }, [id, router]);

  const onSubmit = async e => {
    e.preventDefault();

    if (!title || !description) {
      alert("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);
    const userId = session?.user?.id;

    try {
      const res = await fetch(id ? `/api/tasks/${id}` : "/api/tasks", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          ...(id ? {} : { userId }),
        }),
      });

      if (!res.ok) throw new Error("Error al guardar la tarea");

      const data = await res.json();
      console.log("Task saved:", data);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Ocurrió un error al guardar la tarea.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar la tarea");

      const data = await res.json();
      console.log("Deleted:", data);
      router.push("/");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Ocurrió un error al eliminar la tarea.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Mostrar loader mientras se cargan los datos (solo en edición)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-slate-700/70 p-10 rounded-lg w-full max-w-lg flex flex-col items-center">
          <span className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-lg font-medium">Cargando tarea...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        className="bg-slate-700/70 p-10 rounded-lg w-full max-w-lg"
        onSubmit={onSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm text-white">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter the task title"
          className="border border-gray-400 bg-amber-50 text-black rounded-[5px] p-2 mb-4 w-full"
          onChange={e => setTitle(e.target.value)}
          value={title}
          disabled={isSubmitting || isDeleting}
        />

        <label htmlFor="description" className="font-bold text-sm text-white">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          placeholder="Enter the task description"
          className="border border-gray-400 bg-amber-50 text-black rounded-[5px] p-2 w-full"
          onChange={e => setDescription(e.target.value)}
          value={description}
          disabled={isSubmitting || isDeleting}
        />

        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            disabled={isSubmitting || isDeleting}
            className={`${
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white p-2 rounded-[5px] transition-colors flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {id ? "Actualizando..." : "Creando..."}
              </>
            ) : (
              id ? "Update" : "Create"
            )}
          </button>

          {id && (
            <button
              type="button"
              disabled={isSubmitting || isDeleting}
              onClick={handleDelete}
              className={`${
                isDeleting 
                  ? "bg-red-400 cursor-not-allowed" 
                  : "bg-red-600 hover:bg-red-700"
              } text-white p-2 rounded-[5px] transition-colors flex items-center gap-2`}
            >
              {isDeleting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPage;
