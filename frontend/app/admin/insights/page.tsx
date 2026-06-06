"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Insights() {
  const [dados, setDados] = useState({
    total: 0,
    pendentes: 0,
    rejeitados: 0,
    aprovados: 0,
    totalLikes: 0,
    usuarios: 0,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resAnuncios, resUsuarios] = await Promise.all([
        fetch("http://localhost:3001/anuncio"),
        fetch("http://localhost:3001/usuario"),
      ]);

      const anuncios = await resAnuncios.json();
      const usuarios = await resUsuarios.json();

      const total = anuncios.length;

      const pendentes = anuncios.filter(
        (a: any) => a.status === "pendente"
      ).length;

      const aprovados = anuncios.filter(
        (a: any) => a.status === "aprovado"
      ).length;

      const rejeitados = anuncios.filter(
        (a: any) => a.status === "rejeitado"
      ).length;

      const totalLikes = anuncios.reduce((acc: number, a: any) => {
        return acc + (a.likes || 0);
      }, 0);

      setDados({
        total,
        pendentes,
        aprovados,
        rejeitados,
        totalLikes,
        usuarios: usuarios.length,
      });
    } catch (error) {
      console.error("Erro ao carregar insights:", error);
    }
  };

  const taxaAprovacao =
    dados.total > 0
      ? Math.round((dados.aprovados / dados.total) * 100)
      : 0;

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Dashboard de Insights
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3 rounded-lg shadow hover:bg-cyan-500 transition">
              <span className="font-semibold">Total de anúncios</span>
              <span className="font-bold text-xl">{dados.total}</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-400 px-4 py-3 rounded-lg shadow hover:bg-yellow-500 transition">
              <span className="font-semibold">Anúncios pendentes</span>
              <span className="font-bold text-xl">{dados.pendentes}</span>
            </div>

            <div className="flex justify-between items-center bg-red-500 px-4 py-3 rounded-lg shadow hover:bg-red-600 transition">
              <span className="font-semibold">Anúncios rejeitados</span>
              <span className="font-bold text-xl">{dados.rejeitados}</span>
            </div>

            <div className="flex justify-between items-center bg-purple-500 px-4 py-3 rounded-lg shadow hover:bg-purple-600 transition">
              <span className="font-semibold">Usuários cadastrados</span>
              <span className="font-bold text-xl">{dados.usuarios}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-green-500 px-4 py-3 rounded-lg shadow hover:bg-green-600 transition">
              <span className="font-semibold">Anúncios aprovados</span>
              <span className="font-bold text-xl">{dados.aprovados}</span>
            </div>

            <div className="flex justify-between items-center bg-cyan-300 px-4 py-3 rounded-lg shadow hover:bg-cyan-400 transition">
              <span className="font-semibold">Taxa de aprovação</span>
              <span className="font-bold text-xl">{taxaAprovacao}%</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-700 px-4 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
              <span className="font-semibold">Total de curtidas</span>
              <span className="font-bold text-xl">{dados.totalLikes}</span>
            </div>

            <div className="flex justify-between items-center bg-orange-400 px-4 py-3 rounded-lg shadow hover:bg-orange-500 transition">
              <span className="font-semibold">Status do SaaS</span>
              <span className="font-bold text-xl">Ativo</span>
            </div>
          </div>
        </div>
      </div>

      <Link href="/" className="mt-8">
        <button className="bg-[#FF6A00] hover:bg-[#e65c00] text-black px-6 py-2 rounded-lg flex items-center gap-2 transition">
          <ArrowLeft size={18} />
          Voltar
        </button>
      </Link>
    </div>
  );
}