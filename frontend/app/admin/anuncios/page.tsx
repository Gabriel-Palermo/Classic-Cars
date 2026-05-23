"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminAnuncios() {
<<<<<<< HEAD
=======
;
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  const [anuncios, setAnuncios] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
<<<<<<< HEAD
    carregarAnuncios();
  }, []);

  const carregarAnuncios = async () => {
    const response = await fetch("http://localhost:3001/anuncio");
    const data = await response.json();
    setAnuncios(data);
  };

  const atualizarStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3001/anuncio/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      alert("Erro ao atualizar status");
      return;
    }

    setAnuncios((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  const excluir = async (id: number) => {
    const response = await fetch(`http://localhost:3001/anuncio/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Erro ao excluir anúncio");
      return;
    }

    setAnuncios((prev) => prev.filter((a) => a.id !== id));
  };

  const pegarImagem = (a: any) => {
    try {
      const imagens = a.imagens ? JSON.parse(a.imagens) : [];
      return imagens[0] || "/images/default.jpg";
    } catch {
      return "/images/default.jpg";
    }
=======
    const anunciosStorage = JSON.parse(localStorage.getItem("anuncios") || "[]");
    setAnuncios(anunciosStorage);
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
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">

      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          Conferir publicações de anúncios
        </h1>

<<<<<<< HEAD
        <div className="max-h-[400px] overflow-y-auto pr-3 space-y-2">

          {anuncios.map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-[430px_220px_150px] items-center gap-4 border-b py-4"
            >
              <div className="flex gap-4 items-center">

                <img
                  src={pegarImagem(a)}
                  className="w-32 h-24 object-cover rounded"
                  alt={a.modelo}
                />

                <div className="text-sm">
                  <p><b>Modelo:</b> {a.modelo}</p>
=======
        {/* LISTA COM SCROLL */}
        <div className="max-h-[400px] overflow-y-auto pr-3 space-y-2">

          {anuncios.map((a, i) => (
            <div key={i} className="grid grid-cols-[430px_220px_150px] items-center gap-4 border-b py-4">

              {/* ESQUERDA */}
              <div className="flex gap-4 items-center">

                <img
                  src={a.imagens?.[0] || "/images/sem-imagem.png"}
                  className="w-32 h-24 object-cover rounded"
                />

                <div className="text-sm">
                  <p><b>Modelo:</b> {a.nome}</p>
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
                  <p><b>Ano:</b> {a.ano}</p>
                  <p><b>Km:</b> {a.km}</p>
                </div>
              </div>

<<<<<<< HEAD
              <div className="text-sm">
                <p><b>Valor:</b> R$ {a.precoAvista}</p>
                <p><b>Vendedor:</b> {a.usuario?.nome || "-"}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => excluir(a.id)}
=======
              {/* CENTRO */}
              <div className="text-sm">
                <p><b>Valor:</b> R$ {a.avista}</p>
                <p><b>Vendedor:</b> {a.usuario}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => excluir(i)}
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                  >
                    Excluir
                  </button>

<<<<<<< HEAD
                  <button
                    onClick={() => router.push(`/insights?id=${a.id}`)}
                    className="bg-[#00C2CB] text-white px-2 py-1 rounded text-xs hover:bg-[#00a8b0] transition"
                  >
=======
                  <button className="bg-[#00C2CB] text-white px-2 py-1 rounded text-xs hover:bg-[#00a8b0] transition">
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
                    Insights
                  </button>
                </div>
              </div>

<<<<<<< HEAD
              <div className="flex justify-end gap-2">

                <button
                  onClick={() => atualizarStatus(a.id, "aprovado")}
=======
              {/* DIREITA - STATUS */}
              <div className="flex justify-end gap-2">

                <button
                  onClick={() => atualizarStatus(i, "aprovado")}
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
                  className={`p-2 rounded ${
                    a.status === "aprovado" ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  <ThumbsUp size={16} />
                </button>

                <button
<<<<<<< HEAD
                  onClick={() => atualizarStatus(a.id, "rejeitado")}
                  className={`p-2 rounded ${
                    a.status === "rejeitado" ? "bg-red-500" : "bg-gray-200"
=======
                  onClick={() => atualizarStatus(i, "recusado")}
                  className={`p-2 rounded ${
                    a.status === "recusado" ? "bg-red-500" : "bg-gray-200"
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
                  }`}
                >
                  <ThumbsDown size={16} />
                </button>

                <button
<<<<<<< HEAD
                  onClick={() => atualizarStatus(a.id, "pendente")}
=======
                  onClick={() => atualizarStatus(i, "pendente")}
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
                  className={`p-2 rounded ${
                    a.status === "pendente" ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                >
                  <Minus size={16} />
                </button>

              </div>
<<<<<<< HEAD
            </div>
          ))}

          {anuncios.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Nenhum anúncio encontrado
            </p>
          )}

        </div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-[#FF6A00] text-black px-6 py-2 rounded-lg shadow hover:bg-[#e65c00]"
=======

            </div>
          ))}

        </div>
      </div>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-[#FF6A00] text-black px-6 py-2 rounded-lg shadow hover hover:bg-[#e65c00]"
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
      >
        ← Voltar
      </button>

    </div>
  );
}