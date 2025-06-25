"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const EditPage = ({ params }) => {
  const { id } = use(params);
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
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
        console.error("Fetch error:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async ({ title, description }) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Error al actualizar la tarea");

      const data = await res.json();
      console.log("Updated:", data);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Update error:", error);
      alert("Ocurrió un error al actualizar la tarea.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        className="bg-slate-700/70 p-10 rounded-lg w-full max-w-lg"
        onSubmit={e => {
          e.preventDefault();
          handleUpdate({ title, description });
        }}
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
          disabled={isUpdating || isDeleting}
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
          disabled={isUpdating || isDeleting}
        />

        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            disabled={isUpdating || isDeleting}
            className={`${
              isUpdating 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white p-2 rounded-[5px] transition-colors flex items-center gap-2`}
          >
            {isUpdating ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Actualizando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>

          <button
            type="button"
            disabled={isUpdating || isDeleting}
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
        </div>
      </form>
    </div>
  );
};

export default EditPage;
