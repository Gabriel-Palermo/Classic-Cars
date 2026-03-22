"use client";

import { CarCard } from "./components/features/CarCard";
import { useBusca } from "@/app/context/BuscaContext";

const carros = [
  { nome: "VW Gol 1000", ano: 1995, km: "134.215", imagem: "/images/gol-quadrado.jpg" },
  { nome: "Opala Diplomata 4.1", ano: 1990, km: "72.189", imagem: "/images/opala-diplomata.jpeg" },
  { nome: "Omega CD 4.1", ano: 1996, km: "88.456", imagem: "/images/omega.jpg" },
  { nome: "D-20 Custom 4x4", ano: 1989, km: "44.130", imagem: "/images/d20.jpg" },
];

export default function Home() {

  const { busca } = useBusca();

  const carrosFiltrados = carros.filter((carro) =>
    carro.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">

      <div className="grid grid-cols-4 gap-6 mt-6">
        {carrosFiltrados.map((carro, i) => (
          <CarCard key={i} carro={carro} />
        ))}
      </div>

      {carrosFiltrados.length === 0 && (
        <p className="text-gray-500 mt-4">Nenhum carro encontrado</p>
      )}

        {/* PAGINAÇÃO */}
      <div className="flex gap-4 mt-10 items-center">
        <button className="bg-[#FF6A00] text-black px-4 py-2 rounded hover:bg-[#FF6A00]/80" onClick={() => alert("Não possui mais páginas")}>
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