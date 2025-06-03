"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unknown error");
      } else {
        setMessage(data.message);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage("Connection error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-sky-400 border-t-pink-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-t-4 border-pink-400 border-t-sky-500 opacity-60 animate-spin-reverse" />
      </div>
      <span className="mt-4 text-sky-400 font-semibold text-lg animate-pulse">Creating account...</span>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto border p-6 rounded shadow space-y-4 bg-slate-700/70"
    >
      <h1 className="text-2xl font-bold mb-2">Create account</h1>

      {message && (
        <p className={`text-sm font-semibold ${message.includes("creado") || message.includes("created") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <div>
        <label className="block text-sm">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full border px-3 py-2 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
            tabIndex={-1}
            disabled={loading}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 cursor-pointer"
        disabled={loading}
      >
        Register
      </button>
    </form>
  );
}
