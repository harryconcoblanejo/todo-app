"use client";

import Link from "next/link";
import { useState } from "react";
import SignOutButton from "./SignOutButton";

export default function NavbarClient({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("consoleando session", session);

  return (
    <nav className="bg-slate-900 p-4 flex items-center relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white font-bold text-2xl whitespace-nowrap"
        >
          TO DO APP
        </Link>

        {/* Botón hamburguesa solo en móvil */}
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

        {/* Contenedor de enlaces */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-end sm:space-x-4
            absolute sm:static top-full left-0 right-0 mx-auto max-w-xs sm:max-w-full w-full sm:w-auto bg-slate-900 sm:bg-transparent 
            transition-all duration-300 overflow-hidden
            ${menuOpen ? "max-h-screen py-4 sm:max-h-full sm:py-0" : "max-h-0 sm:max-h-full"}
          `}
        >
          {session ? (
            // Usuario logueado
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 sm:justify-end w-full">
              <span className="text-white px-3 py-2">{session.user.email}</span>

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
            </div>
          ) : (
            // Usuario no logueado
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 sm:justify-end w-full">
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
