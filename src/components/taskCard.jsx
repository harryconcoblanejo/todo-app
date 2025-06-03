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
    setLoading(true);
    setCardColor(color);
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      });
    } catch (e) {
      // Manejo de error opcional
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={task.id}
      className={`${cardColor} p-3 border border-gray-700 rounded-lg transition-colors cursor-pointer max-w-full  overflow-hidden flex`}
      onClick={handleClick}
    >
      {/* Barra lateral de colores */}
      <div
        className="flex flex-col justify-center items-center mr-3"
        onClick={(e) => e.stopPropagation()} // Evita que el click dispare el handleClick
      >
        {colorOptions.map((opt) => (
          <button
            key={opt.color}
            className={`${opt.color} w-5 h-5 rounded-full mb-2 border-2 border-white focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
