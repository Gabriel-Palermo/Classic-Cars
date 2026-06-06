"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Insights() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dados, setDados] = useState({
    totalAnuncios: 0,
    totalLikes: 0,
    mediaLikes: 0,
    positivos: 0,
    negativos: 0,
  });

  useEffect(() => {
    const carregarInsights = async () => {
      try {
        const id = searchParams.get("id");

        const response = await fetch("http://localhost:3001/anuncio");
        const anuncios = await response.json();

        const likesSalvos = JSON.parse(
          localStorage.getItem("likesAnuncios") || "{}"
        );

        let anunciosFiltrados = anuncios;

        if (id) {
          anunciosFiltrados = anuncios.filter(
            (a: any) => String(a.id) === String(id)
          );
        }

        const totalAnuncios = anunciosFiltrados.length;

        const totalLikes = anunciosFiltrados.reduce(
          (acc: number, anuncio: any) => {
            return acc + Number(likesSalvos[anuncio.id] || 0);
          },
          0
        );

        const mediaLikes =
          totalAnuncios > 0 ? Math.floor(totalLikes / totalAnuncios) : 0;

        const positivos = anunciosFiltrados.filter(
          (a: any) => Number(likesSalvos[a.id] || 0) >= 5
        ).length;

        const negativos = anunciosFiltrados.filter(
          (a: any) => Number(likesSalvos[a.id] || 0) < 5
        ).length;

        setDados({
          totalAnuncios,
          totalLikes,
          mediaLikes,
          positivos,
          negativos,
        });
      } catch (error) {
        console.error("Erro ao carregar insights:", error);
      }
    };

    carregarInsights();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center py-16">
      <div className="bg-white w-[900px] rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-[#1A1A1A]">
          Insights
        </h1>

        <div className="flex justify-between">
          <div className="flex flex-col gap-3 w-[400px] text-[#1A1A1A] text-xl">
            <div className="bg-cyan-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Total de anúncios</span>
              <span>{dados.totalAnuncios}</span>
            </div>

            <div className="bg-green-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>🔥 Curtidas</span>
              <span>{dados.totalLikes}</span>
            </div>

            <div className="bg-yellow-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Média de curtidas</span>
              <span>{dados.mediaLikes}</span>
            </div>

            <div className="bg-purple-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Anúncios positivos</span>
              <span>{dados.positivos}</span>
            </div>

            <div className="bg-red-400 px-4 py-2 rounded-md flex justify-between font-semibold shadow">
              <span>Anúncios negativos</span>
              <span>{dados.negativos}</span>
            </div>
          </div>

          <div className="text-gray-800 leading-7 text-lg w-[350px]">
            <p><b>Total de anúncios:</b> {dados.totalAnuncios}</p>
            <p><b>Total de curtidas:</b> {dados.totalLikes}</p>
            <p><b>Média por anúncio:</b> {dados.mediaLikes}</p>

            <button
              className={`mt-6 w-[300px] px-6 py-2 rounded-md shadow font-semibold flex items-center gap-2 ${
                dados.mediaLikes >= 5 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {dados.mediaLikes >= 5
                ? "Anúncio está positivo ✔"
                : "Anúncio precisa melhorar ⚠"}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.back()}
        className="bg-orange-500 hover:bg-orange-600 transition px-6 py-2 rounded-md mt-8 font-semibold shadow"
      >
        ← Voltar
      </button>
    </div>
  );
}