"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {

  const router = useRouter();
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const tipo = localStorage.getItem("tipo");

    if (tipo !== "admin") {
      router.push("/login");
    } else {
      setCarregado(true);
    }
  }, []);

  if (!carregado) return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Painel Admin</h1>
    </div>
  );
}