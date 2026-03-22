"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminAnuncios() {
;
  const [anuncios, setAnuncios] = useState<any[]>([]);
  const router = useRouter();

  const anunciosFixos= [
    {
      nome: "VW Gol 1000",
      ano: "1995",
      km: "134.215",
      preco: "25.000",
      imagem: "/images/gol-quadrado.jpg",
      usuario: "Carlos",
      status: "pendente"
    },
    {
      nome: "Opala Diplomata 4.1",
      ano: "1990",
      km: "72.189",
      preco: "80.000",
      imagem: "/images/opala-diplomata.jpeg",
      usuario: "Marcos",
      status: "aprovado"
    },
    {
      nome: "Omega CD 4.1",
      ano: "1996",
      km: "88.456",
      preco: "45.000",
      imagem: "/images/omega.jpg",
      usuario: "João",
      status: "recusado"
    }
  ];

  useEffect(() => {
    setAnuncios(anunciosFixos);
  }, []);

  const atualizarStatus = (index: number, status: string) => {
    const novos = [...anuncios];
    novos[index].status = status;

    setAnuncios(novos);
    localStorage.setItem("anuncios", JSON.stringify(novos));
  };

  const excluir = (index: number) => {
    const novos = [...anuncios];
    novos.splice(index, 1);

    setAnuncios(novos);
    localStorage.setItem("anuncios", JSON.stringify(novos));
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">

      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          Conferir publicações de anúncios
        </h1>

        {/* LISTA COM SCROLL */}
        <div className="max-h-[400px] overflow-y-auto pr-3 space-y-2">

          {anuncios.map((a, i) => (
            <div key={i} className="grid grid-cols-[430px_220px_150px] items-center border-b py-4">

              {/* ESQUERDA */}
              <div className="flex gap-4 items-center">

                <img
                  src={a.imagem}
                  className="w-32 h-24 object-cover rounded"
                />

                <div className="text-sm">
                  <p><b>Modelo:</b> {a.nome}</p>
                  <p><b>Ano:</b> {a.ano}</p>
                  <p><b>Km:</b> {a.km}</p>
                </div>
              </div>

              {/* CENTRO */}
              <div className="text-sm">
                <p><b>Valor:</b> R$ {a.preco}</p>
                <p><b>Vendedor:</b> {a.usuario}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => excluir(i)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                  >
                    Excluir
                  </button>

                  <button className="bg-[#00C2CB] text-white px-2 py-1 rounded text-xs hover:bg-[#00a8b0] transition">
                    Insights
                  </button>
                </div>
              </div>

              {/* DIREITA - STATUS */}
              <div className="flex justify-end gap-2">

                <button
                  onClick={() => atualizarStatus(i, "aprovado")}
                  className={`p-2 rounded ${
                    a.status === "aprovado" ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  <ThumbsUp size={16} />
                </button>

                <button
                  onClick={() => atualizarStatus(i, "recusado")}
                  className={`p-2 rounded ${
                    a.status === "recusado" ? "bg-red-500" : "bg-gray-200"
                  }`}
                >
                  <ThumbsDown size={16} />
                </button>

                <button
                  onClick={() => atualizarStatus(i, "pendente")}
                  className={`p-2 rounded ${
                    a.status === "pendente" ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                >
                  <Minus size={16} />
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-[#FF6A00] text-black px-6 py-2 rounded-lg shadow hover hover:bg-[#e65c00]"
      >
        ← Voltar
      </button>

    </div>
  );
}