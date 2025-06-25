"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TaskCard = ({ task }) => {
  const router = useRouter();
  // Estado para el color de la tarjeta, inicializado con el color de la base de datos o el default
  const [cardColor, setCardColor] = useState(task.color || "bg-slate-900");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    router.push(`/task/edit/${task.id}`);
  };

  // Colores disponibles
  const colorOptions = [
    { color: "bg-green-600", label: "Verde" },
    { color: "bg-yellow-400", label: "Amarillo" },
    { color: "bg-orange-500", label: "Naranja" },
  ];

  // Cambia el color y lo guarda en la base de datos
  const handleColorChange = async (color) => {
    if (loading) return; // Prevenir múltiples clicks
    setLoading(true);
    setCardColor(color);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      });
      
      if (!res.ok) {
        throw new Error("Error al actualizar el color");
      }
    } catch (e) {
      console.error("Error al cambiar color:", e);
      // Revertir el color si hay error
      setCardColor(task.color || "bg-slate-900");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={task.id}
      className={`${cardColor} p-3 border border-gray-700 rounded-lg transition-colors cursor-pointer max-w-xs w-full mx-auto overflow-hidden flex relative ${
        loading ? "opacity-75" : ""
      }`}
      onClick={handleClick}
    >
      {/* Overlay de loading */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
          <span className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Barra lateral de colores */}
      <div
        className="flex flex-col justify-center items-center mr-3"
        onClick={(e) => e.stopPropagation()} // Evita que el click dispare el handleClick
      >
        {colorOptions.map((opt) => (
          <button
            key={opt.color}
            className={`${opt.color} w-5 h-5 rounded-full mb-2 border-2 border-white focus:outline-none transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            onClick={() => !loading && handleColorChange(opt.color)}
            title={opt.label}
            type="button"
            disabled={loading}
          />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-2xl mb-2 truncate">
          {task.title}
        </h3>
        <p className="text-white overflow-hidden text-ellipsis whitespace-nowrap">
          {task.description}
        </p>
        <p className="text-white mt-2">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
