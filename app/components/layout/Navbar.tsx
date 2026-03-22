"use client";

import { useBusca } from "@/app/context/BuscaContext";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Car,
  Search,
  Megaphone,
  Phone,
  BarChart3,
  ClipboardList,
  LogOut
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const [usuario, setUsuario] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const { busca, setBusca } = useBusca();
  const router = useRouter();

  useEffect(() => {
    const userTipo = localStorage.getItem("tipo");
    const userNome = localStorage.getItem("usuario");

    setTipo(userTipo);
    setUsuario(userNome);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tipo");
    localStorage.removeItem("usuario");
    setTipo(null);
    setUsuario(null);
    router.push("/");
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* LOGO */}
      <Image src="/images/logo.png" alt="Logo" width={140} height={70} />

      {/* BUSCA */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Busque aqui..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="text-[#1A1A1A] border rounded-full px-4 py-1 w-full"
        />
        <Search size={20} className="absolute right-4 top-2 text-[#1A1A1A]" />
      </div>

      {/* MENU */}
      <nav className="flex gap-10 font-bold text-[#1A1A1A] text-lg">

        {tipo === "admin" ? (
          <>
            <Link href="/" className="flex items-center gap-2 hover:text-[#00C2CB]"><Car size={20}/>Veículos</Link>
            <Link href="/admin/anuncios" className="flex items-center gap-2 hover:text-[#00C2CB]"><Megaphone size={20}/>Anúncios</Link>
            <Link href="/admin/insights" className="flex items-center gap-2 hover:text-[#00C2CB]"><BarChart3 size={20}/>Insights</Link>
            <Link href="/admin/pedidos" className="flex items-center gap-2 hover:text-[#00C2CB]"><ClipboardList size={20}/>Pedidos</Link>
          </>
        ) : tipo === "user" ? (
          <>
            <Link href="/" className="flex items-center gap-2 hover:text-[#00C2CB]"><Car size={20}/>Veículos</Link>
            <Link href="/anunciar" className="flex items-center gap-2 hover:text-[#00C2CB]"><Megaphone size={20}/>Anunciar</Link>
            <Link href="/meus-anuncios" className="flex items-center gap-2 hover:text-[#00C2CB]"><ClipboardList size={20}/>Meus Anúncios</Link>
            <Link href="/contatos" className="flex items-center gap-2 hover:text-[#00C2CB]"><Phone size={20}/>Contatos</Link>
          </>
        ) : (
          <>
            <Link href="/" className="flex items-center gap-2 hover:text-[#00C2CB]"><Car size={20}/>Veículos</Link>
            <Link href="/login" className="flex items-center gap-2 hover:text-[#00C2CB]"><Megaphone size={20}/>Anunciar</Link>
            <Link href="/contatos" className="flex items-center gap-2 hover:text-[#00C2CB]"><Phone size={20}/>Contatos</Link>
          </>
        )}

      </nav>

      {/* LADO DIREITO */}
      {tipo ? (
        <div className="flex items-center gap-4">

          <span className="flex items-center gap-2 font-bold text-[#1A1A1A]">
            <User size={20}/>
            {usuario || "Usuário"}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-400"
          >
            <LogOut size={20}/>
            Sair
          </button>
        </div>
      ) : (
        <Link href="/login" className="flex items-center gap-2 font-bold italic text-xl text-[#1A1A1A] hover:text-[#00C2CB]">
          <User size={20}/>
          Login
        </Link>
      )}

    </header>
  );
};