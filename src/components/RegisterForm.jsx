"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    console.log("Enviando datos:", { email, password });
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error desconocido");
      } else {
        setMessage(data.message);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage("Error de conexión");
      console.log(error);
      console.log("culo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
    >
      <h2 className="text-2xl mb-4">Crear cuenta</h2>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block mb-4">
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition"
      >
        Registrar
      </button>

      {message && (
        <p
          className={`mt-4 font-semibold ${message.includes("creado") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
