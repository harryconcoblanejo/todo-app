"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

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
        "Either you're not registered or you messed up your fingers! ;)"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto border p-6 rounded shadow space-y-4"
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
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
