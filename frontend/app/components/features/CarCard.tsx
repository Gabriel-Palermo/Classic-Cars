"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  carro: any;
  index?: number;
};

export const CarCard = ({ carro }: Props) => {
  const [likes, setLikes] = useState(carro.likes || 0);
  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    const likesSalvos = JSON.parse(
      localStorage.getItem("likesAnuncios") || "{}"
    );

    if (likesSalvos[carro.id] !== undefined) {
      setLikes(likesSalvos[carro.id]);
    }
  }, [carro.id]);

  const handleLike = () => {
    const novosLikes = curtido ? likes - 1 : likes + 1;
    const novoCurtido = !curtido;

    setLikes(novosLikes);
    setCurtido(novoCurtido);

    const likesSalvos = JSON.parse(
      localStorage.getItem("likesAnuncios") || "{}"
    );

    likesSalvos[carro.id] = novosLikes;

    localStorage.setItem("likesAnuncios", JSON.stringify(likesSalvos));
  };

  const imagem =
    carro.imagem ||
    carro.imagens ||
    "/images/sem-imagem.jpg";

  return (
    <div className="bg-white rounded-xl shadow-md p-3 w-64">
      <Image
        src={imagem}
        alt={carro.modelo || "Veículo"}
        width={300}
        height={200}
        className="rounded-lg h-40 w-full object-cover border border-black"
      />

      <h2 className="text-[#1A1A1A] font-bold mt-2 text-xl">
        {carro.modelo}
      </h2>

      <p className="text-sm text-[#1A1A1A]">
        Ano: {carro.ano}
      </p>

      <p className="text-sm text-[#1A1A1A]">
        Km: {carro.km}
      </p>

      <div className="flex justify-between mt-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-black transition ${
            curtido ? "bg-red-500" : "bg-[#00D084]"
          }`}
        >
          🔥 {likes}
        </button>

        <Link href={`/anuncio?id=${carro.id}`}>
          <button className="bg-[#00C2CB] px-4 py-1 rounded hover:bg-[#00B0B5] transition text-lg text-[#1A1A1A]">
            Ver anúncio
          </button>
        </Link>
      </div>
    </div>
  );
};