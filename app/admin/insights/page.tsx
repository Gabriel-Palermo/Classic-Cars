"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Insights() {

    const dados = [
        { titulo: "Total de anúncios feitos", valor: 2397, cor: "bg-cyan-400" },
        { titulo: "Pedidos de anúncios pendentes", valor: 308, cor: "bg-yellow-400" },
        { titulo: "Pedidos rejeitados", valor: 37, cor: "bg-orange-500" },
        { titulo: "Registro de contas", valor: 103, cor: "bg-purple-500" }
    ];

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
              <span className="font-bold text-xl">2397</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-400 px-4 py-3 rounded-lg shadow hover:bg-yellow-500 transition">
              <span className="font-semibold">Pedidos de anúncios pendentes</span>
              <span className="font-bold text-xl">308</span>
            </div>

            <div className="flex justify-between items-center bg-orange-500 px-4 py-3 rounded-lg shadow hover:bg-orange-600 transition">
              <span className="font-semibold">Pedidos rejeitados</span>
              <span className="font-bold text-xl">37</span>
            </div>

            <div className="flex justify-between items-center bg-purple-500 px-4 py-3 rounded-lg shadow text-[#1A1A1A] hover:bg-purple-600 transition">
              <span className="font-semibold">Registro de contas</span>
              <span className="font-bold text-xl">103</span>
            </div>

          </div>

          {/* DIREITA */}
          <div className="space-y-4">

            <div className="flex justify-between items-center bg-green-500 px-4 py-3 rounded-lg shadow text-[#1A1A1A] hover:bg-green-600 transition">
              <span className="font-semibold">Anúncios Positivos</span>
              <span className="font-bold text-xl">2397</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-700 px-4 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
              <span className="font-semibold">Anúncios Medianos</span>
              <span className="font-bold text-xl">308</span>
            </div>

            <div className="flex justify-between items-center bg-red-500 px-4 py-3 rounded-lg shadow text-[#1A1A1A] hover:bg-red-600 transition">
              <span className="font-semibold">Anúncios Negativos</span>
              <span className="font-bold text-xl">37</span>
            </div>

            <div className="flex justify-between items-center bg-cyan-300 px-4 py-3 rounded-lg shadow hover:bg-cyan-400 transition">
              <span className="font-semibold">Busca por pesquisa</span>
              <span className="font-bold text-xl">103</span>
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