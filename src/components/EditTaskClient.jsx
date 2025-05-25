"use client";
import { useState } from "react";

export default function EditTaskClient({ task }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async e => {
    e.preventDefault();
    // lógica para enviar cambios a API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Editar Tarea</h2>

      <label className="block">
        <span className="text-gray-700 font-medium">Título</span>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Descripción</span>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descripción"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
