"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      className="text-white border border-white px-3 py-2 rounded hover:bg-white hover:text-slate-900 transition"
    >
      Logout
    </button>
  );
}
