"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, ArrowLeft } from "lucide-react";

export default function Pedidos() {

  const [pedidos, setPedidos] = useState([
    {
      nome: "Gol GTI 2.0",
      ano: 1994,
      km: "124.116",
      preco: "124.900",
      usuario: "João Silva",
      placa: "ABC1D23",
      imagem: "/images/gol-1.jpg"
    },
    {
      nome: "Monza Classic",
      ano: 1989,
      km: "93.198",
      preco: "39.800",
      usuario: "Severino Souza",
      placa: "DCB1A23",
      imagem: "/images/monza.jpg"
    },
    {
      nome: "Chevette DL 1.6",
      ano: 1993,
      km: "51.354",
      preco: "32.500",
      usuario: "Arnaldo Pereira",
      placa: "CAF1A23",
      imagem: "/images/chevette.jpg"
    },
  ]);

  // ✅ aceitar pedido
  const aceitar = (index: number) => {
    const novos = pedidos.filter((_, i) => i !== index);
    setPedidos(novos);
  };

  // ❌ recusar pedido
  const recusar = (index: number) => {
    const novos = pedidos.filter((_, i) => i !== index);
    setPedidos(novos);
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">

      {/* CARD PRINCIPAL */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center mb-8">
          Conferir pedidos de anúncios
        </h1>

        {/* LISTA */}
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 text-xl">

          {pedidos.map((p, i) => (
            <div key={i} className="grid grid-cols-[300px_300px_1fr] items-center border-b pb-4">

              {/* ESQUERDA */}
              <div className="flex items-center gap-5">
                <img
                  src={p.imagem}
                  className="w-32 h-24 object-cover rounded"
                />

                <div className="text-sm">
                  <p><b>Modelo:</b> {p.nome}</p>
                  <p><b>Ano:</b> {p.ano}</p>
                  <p><b>Km:</b> {p.km}</p>
                </div>
              </div>

              {/* AÇÕES */}
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => aceitar(i)}
                  className="bg-green-500 hover:bg-green-600 p-2 rounded text-white"
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={() => recusar(i)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* DIREITA */}
              <div className="text-sm">
                <p><b>Valor:</b> R$ {p.preco}</p>
                <p><b>Vendedor:</b> {p.usuario}</p>
                <p><b>Placa:</b> {p.placa}</p>
              </div>

            </div>
          ))}

          {pedidos.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Nenhum pedido pendente
            </p>
          )}

        </div>
      </div>

      {/* CARD DE RESUMO */}
      <div className="bg-white w-full max-w-[900px] mt-6 rounded-xl shadow-md p-4 flex justify-between items-center">

        <div className="bg-[#00C2CB] px-6 py-2 rounded-lg font-semibold hover:bg-[#00B0B5] transition text-xl">
          Total solicitações de anúncios
          <span className="ml-4 font-bold">{pedidos.length}</span>
        </div>

        <span className="text-sm text-gray-600">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* BOTÃO VOLTAR */}
      <Link href="/" className="mt-8">
        <button className="bg-[#FF6A00] hover:bg-[#e65c00] px-6 py-2 rounded-lg flex items-center gap-2">
          <ArrowLeft size={18} />
          Voltar
        </button>
      </Link>

    </div>
  );
}