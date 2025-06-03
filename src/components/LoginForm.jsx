"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.refresh();
      router.push("/");
    } else {
      setError(
        "Either you are not registered or you made a typo! ;)"
      );
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-sky-400 border-t-pink-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-t-4 border-pink-400 border-t-sky-500 opacity-60 animate-spin-reverse" />
      </div>
      <span className="mt-4 text-sky-400 font-semibold text-lg animate-pulse">Signing in...</span>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto border p-6 rounded shadow space-y-4 bg-slate-700/70"
    >
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label className="block text-sm">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-full border px-3 py-2 rounded pr-10"
            disabled={loading}
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
        Login
      </button>
    </form>
  );
}
