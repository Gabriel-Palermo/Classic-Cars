"use client";

import { useRouter } from "next/navigation";

export default function Insights() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center py-16">

      {/* CARD */}
      <div className="bg-white w-[900px] rounded-xl shadow p-8">

        <h1 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Insights</h1>

        <div className="flex justify-between">

          {/* ESQUERDA */}
          <div className="flex flex-col gap-3 w-[400px] text-[#1A1A1A] text-xl">

            <div className="bg-cyan-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow hover:bg-cyan-500 transition">
              <span>Visualizações</span>
              <span>1331</span>
            </div>

            <div className="bg-green-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow hover:bg-green-500 transition">
              <span>🔥 Curtidas</span>
              <span>394</span>
            </div>

            <div className="bg-yellow-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow hover:bg-yellow-500 transition">
              <span>Enviaram mensagem</span>
              <span>25</span>
            </div>

            <div className="bg-purple-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow hover:bg-purple-500 transition">
              <span>Busca por pesquisa</span>
              <span>103</span>
            </div>

          </div>

          {/* DIREITA */}
          <div className="text-gray-800 leading-7 text-lg w-[350px]">

            <p><b>Visualizações Totais:</b> 5.739</p>
            <p><b>Cidades alcançadas:</b> 158</p>
            <p><b>Região mais procurada:</b> SP</p>
            <p><b>Média de idade por procura:</b> +25</p>
            <p><b>Porcentagem de ver anúncio:</b> 23,19%</p>

            <button className="bg-green-500 mt-6 w-[300px] px-6 py-2 rounded-md shadow font-semibold flex items-center gap-2">
              Anúncio está positivo <span></span>✔
            </button>

          </div>

        </div>
      </div>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => router.back()}
        className="bg-orange-500 hover:bg-orange-600 transition px-6 py-2 rounded-md mt-8 font-semibold shadow flex items-center gap-2 text-[#1A1A1A]"
      >
        ← Voltar
      </button>

    </div>
  );
}