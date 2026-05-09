"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Insights() {

  const [dados, setDados] = useState({
    total: 0,
    pendentes: 0,
    recusados: 0,
    aprovados: 0,
    totalLikes: 0,
    usuarios: 0
  });

  useEffect(() => {
    const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const total = anuncios.length;
    const pendentes = anuncios.filter((a: any) => a.status === "pendente").length;
    const recusados = anuncios.filter((a: any) => a.status === "recusado").length;
    const aprovados = anuncios.filter((a: any) => a.status === "aprovado").length;

    const totalLikes = anuncios.reduce((acc: number, a: any) => {
      return acc + (a.likes || 0);
    }, 0);

    setDados({
      total,
      pendentes,
      recusados,
      aprovados,
      totalLikes,
      usuarios: usuarios.length
    });
  }, []);

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">

      {/* CARD PRINCIPAL */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Gerenciamento de Insights
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-6">

          {/* ESQUERDA */}
          <div className="space-y-4">

            <div className="flex justify-between items-center bg-blue-500 px-4 py-3 rounded-lg shadow hover:bg-cyan-500 transition">
              <span className="font-semibold">Total de anúncios feitos</span>
              <span className="font-bold text-xl">{dados.total}</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-400 px-4 py-3 rounded-lg shadow hover:bg-yellow-500 transition">
              <span className="font-semibold">Pedidos de anúncios pendentes</span>
              <span className="font-bold text-xl">{dados.pendentes}</span>
            </div>

            <div className="flex justify-between items-center bg-orange-500 px-4 py-3 rounded-lg shadow hover:bg-orange-600 transition">
              <span className="font-semibold">Pedidos rejeitados</span>
              <span className="font-bold text-xl">{dados.recusados}</span>
            </div>

            <div className="flex justify-between items-center bg-purple-500 px-4 py-3 rounded-lg shadow text-[#1A1A1A] hover:bg-purple-600 transition">
              <span className="font-semibold">Registro de contas</span>
              <span className="font-bold text-xl">{dados.usuarios}</span>
            </div>

          </div>

          {/* DIREITA */}
          <div className="space-y-4">

            <div className="flex justify-between items-center bg-green-500 px-4 py-3 rounded-lg shadow text-[#1A1A1A] hover:bg-green-600 transition">
              <span className="font-semibold">Anúncios Positivos</span>
              <span className="font-bold text-xl">{dados.aprovados}</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-700 px-4 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
              <span className="font-semibold">Anúncios Medianos</span>
              <span className="font-bold text-xl">{dados.totalLikes}</span>
            </div>

            <div className="flex justify-between items-center bg-red-500 px-4 py-3 rounded-lg shadow text-[#1A1A1A] hover:bg-red-600 transition">
              <span className="font-semibold">Anúncios Negativos</span>
              <span className="font-bold text-xl">{dados.recusados}</span>
            </div>

            <div className="flex justify-between items-center bg-cyan-300 px-4 py-3 rounded-lg shadow hover:bg-cyan-400 transition">
              <span className="font-semibold">Busca por pesquisa</span>
              <span className="font-bold text-xl">{dados.total}</span>
            </div>

          </div>

        </div>
      </div>

      {/* BOTÃO VOLTAR */}
      <Link href="/" className="mt-8">
        <button className="bg-[#FF6A00] hover:bg-[#e65c00] text-black px-6 py-2 rounded-lg flex items-center gap-2 transition">
          <ArrowLeft size={18} />
          Voltar
        </button>
      </Link>

    </div>
  );
}