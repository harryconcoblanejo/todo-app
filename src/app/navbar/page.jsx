"use client";

import NavbarClient from "@/components/NavbarClient";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;
  console.log(session);
  return <NavbarClient session={session} />;
}
