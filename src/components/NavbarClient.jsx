"use client";

import Link from "next/link";
import { useMenu } from "../contexts/MenuContext";
import SignOutButton from "./SignOutButton";

export default function NavbarClient({ session }) {
  const { menuOpen, toggleMenu, closeMenu } = useMenu();

  const handleLinkClick = (href) => {
    closeMenu();
  };

  return (
    <nav className="bg-slate-900 p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
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
          onClick={toggleMenu}
          className="sm:hidden text-white focus:outline-none z-20 relative p-2"
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
          className={`${
            menuOpen 
              ? "flex flex-col" 
              : "hidden"
          } sm:flex sm:flex-row sm:items-center sm:space-x-4 absolute sm:static top-full left-0 right-0 bg-slate-900 sm:bg-transparent transition-all duration-300 sm:w-auto w-full z-50 border-t border-slate-700 sm:border-t-0 shadow-lg sm:shadow-none`}
          style={{ minHeight: menuOpen ? 'auto' : '0' }}
        >
          {session ? (
            <>
              <div className="px-6 py-4 sm:px-3 sm:py-2 flex justify-center sm:justify-start border-b border-slate-700 sm:border-b-0">
                <Link
                  href="/new"
                  className="text-white hover:text-slate-200 px-3 py-2 rounded transition border border-transparent sm:border-white hover:bg-white hover:text-slate-900"
                  onClick={() => handleLinkClick("/new")}
                >
                  New Task
                </Link>
              </div>
              <div className="px-6 py-4 sm:px-3 sm:py-2 flex justify-center sm:justify-start">
                <SignOutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white border border-white px-6 py-4 text-sm rounded hover:bg-white hover:text-slate-900 transition cursor-pointer w-fit mx-auto sm:mx-0 block text-center sm:px-2 sm:py-1 border-b border-slate-700 sm:border-b-0 hover:border-b-2 hover:border-white sm:hover:border-b-0"
                onClick={() => handleLinkClick("/login")}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-white border border-white px-6 py-4 text-sm rounded hover:bg-white hover:text-slate-900 transition cursor-pointer w-fit mx-auto sm:mx-0 block text-center mt-2 sm:mt-0 sm:px-2 sm:py-1 hover:border-b-2 hover:border-white sm:hover:border-b-0"
                onClick={() => handleLinkClick("/register")}
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
