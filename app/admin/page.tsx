"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';


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
  <div className="min-h-screen from-slate-50 to-blue-50 flex flex-col items-center p-8 gap-10">
      <div className="bg-white/80 bg-gradient-to-br backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-[#1A1A1A] text-center bg-gradient-to-r from-[#1A1A1A] to-slate-700 bg-clip-text">
          Painel Administrativo
        </h1>
        
        <Link 
          href="/"
          className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-2xl py-4 px-12 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
        >
          Acessar Painel
        </Link>
      </div>
    </div>
  );
}