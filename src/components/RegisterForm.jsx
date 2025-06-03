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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("algun error de mierda", data);

        setMessage(data.message || "Error desconocido");
      } else {
        setMessage(data.message);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage("Error de conexión");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto border p-6 rounded shadow space-y-4 bg-slate-700/70"
    >
      <h1 className="text-2xl font-bold mb-2">Create account</h1>
      <div>
        <label className="block text-sm">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 cursor-pointer"
      >
        Register
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
