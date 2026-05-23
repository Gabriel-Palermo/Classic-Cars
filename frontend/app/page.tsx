"use client";

import { CarCard } from "./components/features/CarCard";
import { useBusca } from "@/app/context/BuscaContext";
import { useEffect, useState } from "react";

export default function Home() {

  const { busca } = useBusca();
  const [carros, setCarros] = useState<any[]>([]);

  useEffect(() => {
    const carregarAnuncios = async () => {
      try {
        const response = await fetch("http://localhost:3001/anuncio");

        if (!response.ok) {
          console.log("Erro ao buscar anúncios");
          return;
        }

        const anuncios = await response.json();

        const aprovados = anuncios.filter(
          (a: any) => a.status === "aprovado"
        );

        const formatados = aprovados.map((a: any) => {
          let imagens = [];

          try {
            imagens = a.imagens ? JSON.parse(a.imagens) : [];
          } catch {
            imagens = [];
          }

          return {
            ...a,
            id: a.id,
            nome: a.modelo || "Sem nome",
            imagem: imagens[0] || "/images/default.jpg",
            likes: a.likes || 0,
          };
        });

        setCarros(formatados);
      } catch (error) {
        console.log("Erro ao conectar com o servidor", error);
      }
    };

    carregarAnuncios();
  }, []);

  const carrosFiltrados = carros.filter((carro) =>
    (carro.nome || "")
      .toLowerCase()
      .includes((busca || "").toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">

      <div className="grid grid-cols-4 gap-6 mt-6">
        {carrosFiltrados.map((carro, i) => (
          <CarCard
            key={carro.id || i}
            index={i}
            carro={carro}
          />
        ))}
      </div>

      {carrosFiltrados.length === 0 && (
        <p className="text-gray-500 mt-4">Nenhum carro encontrado</p>
      )}

      {/* PAGINAÇÃO */}
      <div className="flex gap-4 mt-10 items-center">
        <button
          className="bg-[#FF6A00] text-black px-4 py-2 rounded hover:bg-[#FF6A00]/80"
          onClick={() => alert("Não possui mais páginas")}
        >
          Próximo
        </button>

        <span className="text-[#1A1A1A] hover:text-[#00C2CB]">1</span>
        <span className="text-[#1A1A1A] hover:text-[#00C2CB]">2</span>
        <span className="text-[#1A1A1A] hover:text-[#00C2CB]">3</span>

        <button className="bg-orange-500 text-[#1A1A1A] px-3 py-2 rounded hover:bg-orange-400">
          &gt;
        </button>
      </div>

    </div>
  );
}