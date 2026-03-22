"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  carro: any; // depois a gente tipa melhor
};

export const CarCard = ({ carro }: Props) => {

  const [likes, setLikes] = useState(0);
  const [curtido, setCurtido] = useState(false);

  const handleLike = () => {
    if (curtido) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setCurtido(!curtido);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-3 w-64">
      
      <Image
        src={carro.imagem}
        alt={carro.nome}
        width={300}
        height={200}
        className="rounded-lg h-40 w-full object-cover border border-black"
      />

      <h2 className="text-[#1A1A1A] font-bold mt-2 text-xl">
        {carro.nome}
      </h2>

      <p className="text-sm text-[#1A1A1A]">Ano: {carro.ano}</p>
      <p className="text-sm text-[#1A1A1A]">Km: {carro.km}</p>

      <div className="flex justify-between mt-2">
        
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-black transition
          ${curtido ? "bg-red-500" : "bg-[#00D084]"}`}
        >
          🔥 {likes}
        </button>

        <Link href="/anuncio">
          <button className="bg-[#00C2CB] px-4 py-1 rounded hover:bg-[#00B0B5] transition text-lg text-[#1A1A1A]">
            Ver anúncio
          </button>
        </Link>

      </div>
    </div>
  );
};