"use client";

import Link from "next/link";
import { useState } from "react";
import SignOutButton from "./SignOutButton";

export default function NavbarClient({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Título a la izquierda */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-white font-bold text-2xl whitespace-nowrap"
          >
            TO DO APP
          </Link>
        </div>

        {/* Email centrado */}
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-white">
          {session?.user?.email}
        </div>

        {/* Botón hamburguesa visible solo en móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Enlaces y acciones a la derecha */}
        <div
          className={`flex-col sm:flex sm:flex-row sm:items-center sm:space-x-4 absolute sm:static top-full left-0 right-0 bg-slate-900 sm:bg-transparent transition-all duration-300 sm:w-auto w-full z-10
          ${menuOpen ? "flex py-4" : "hidden sm:flex"}
          `}
        >
          {session ? (
            <>
              <Link
                href="/new"
                className="text-white hover:text-slate-200 px-3 py-2 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                New Task
              </Link>
              <div className="px-3 py-2">
                <SignOutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white border border-white px-2 py-1 text-sm rounded hover:bg-white hover:text-slate-900 transition cursor-pointer w-fit"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-white border border-white px-2 py-1 text-sm rounded hover:bg-white hover:text-slate-900 transition cursor-pointer w-fit"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
