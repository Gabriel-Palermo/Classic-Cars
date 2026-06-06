"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, ArrowLeft } from "lucide-react";

type Pedido = {
  id: number;
  modelo: string;
  ano: string;
  km: string;
  precoAvista: string;
  usuario?: {
    nome: string;
  };
  placa?: string;
  imagens?: string;
  status: string;
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const response = await fetch("http://localhost:3001/anuncio");
    const anuncios = await response.json();

    const pendentes = anuncios.filter(
      (a: Pedido) => a.status === "pendente"
    );

    setPedidos(pendentes);
  };

  const pegarImagem = (imagens?: string) => {
    try {
      const lista = imagens ? JSON.parse(imagens) : [];
      return lista[0] || "/images/sem-foto-carro.png";
    } catch {
      return "/images/sem-foto-carro.png";
    }
  };

  const atualizarStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3001/anuncio/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      alert("Erro ao atualizar status");
      return;
    }

    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Conferir pedidos de anúncios
        </h1>

        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 text-xl">
          {pedidos.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[300px_300px_1fr] items-center border-b pb-4"
            >
              <div className="flex items-center gap-5">
                <img
                  src={pegarImagem(p.imagens)}
                  className="w-32 h-24 object-cover rounded"
                  alt={p.modelo}
                />

                <div className="text-sm">
                  <p><b>Modelo:</b> {p.modelo}</p>
                  <p><b>Ano:</b> {p.ano}</p>
                  <p><b>Km:</b> {p.km}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => atualizarStatus(p.id, "aprovado")}
                  className="bg-green-500 hover:bg-green-600 p-2 rounded text-white"
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={() => atualizarStatus(p.id, "rejeitado")}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="text-sm">
                <p><b>Valor:</b> R$ {p.precoAvista}</p>
                <p><b>Vendedor:</b> {p.usuario?.nome || "-"}</p>
                <p><b>Status:</b> {p.status}</p>
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

      <div className="bg-white w-full max-w-[900px] mt-6 rounded-xl shadow-md p-4 flex justify-between items-center">
        <div className="bg-[#00C2CB] px-6 py-2 rounded-lg font-semibold hover:bg-[#00B0B5] transition text-xl">
          Total solicitações de anúncios
          <span className="ml-4 font-bold">{pedidos.length}</span>
        </div>

        <span className="text-sm text-gray-600">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      <Link href="/" className="mt-8">
        <button className="bg-[#FF6A00] hover:bg-[#e65c00] px-6 py-2 rounded-lg flex items-center gap-2 text-white">
          <ArrowLeft size={18} />
          Voltar
        </button>
      </Link>
    </div>
  );
}