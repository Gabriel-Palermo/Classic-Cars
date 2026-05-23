"use client";

import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3

type Props = {
  carro: any;
  index: number;
};

<<<<<<< HEAD
export const CarCard = ({ carro }: Props) => {
  const [likes, setLikes] = useState(carro.likes || 0);
  const [curtido, setCurtido] = useState(false);

  const handleVerAnuncio = () => {
    localStorage.setItem(
      "anuncioSelecionado",
      JSON.stringify(carro)
    );
  };

  const handleLike = async () => {
    try {
      const novosLikes = curtido
        ? likes - 1
        : likes + 1;

      setLikes(novosLikes);
      setCurtido(!curtido);

      // FUTURO:
      // integrar curtidas reais no backend

    } catch (error) {
      console.log(error);
=======
export const CarCard = ({ carro, index }: Props) => {

  const [likes, setLikes] = useState(0);
  const [curtido, setCurtido] = useState(false);

  // Carregar likes salvos
  useEffect(() => {
    const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");

    if (anuncios[index]?.likes) {
      setLikes(anuncios[index].likes);
    }

    // NOVO - recuperar curtida
    if (anuncios[index]?.curtido) {
      setCurtido(true);
    }
  }, [index]);

  const handleVerAnuncio = () => {
    localStorage.setItem("anuncioSelecionado", JSON.stringify(carro));
  };

  const handleLike = () => {
    const novosLikes = curtido ? likes - 1 : likes + 1;
    const novoCurtido = !curtido;

    setLikes(novosLikes);
    setCurtido(novoCurtido);

    const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");

    if (anuncios[index]) {
      anuncios[index].likes = novosLikes;
      anuncios[index].curtido = novoCurtido;
      localStorage.setItem("anuncios", JSON.stringify(anuncios));
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-3 w-64">
<<<<<<< HEAD

=======
      
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
      <Image
        src={carro.imagem || "/images/default.jpg"}
        alt={carro.nome}
        width={300}
        height={200}
        className="rounded-lg h-40 w-full object-cover border border-black"
      />

      <h2 className="text-[#1A1A1A] font-bold mt-2 text-xl">
        {carro.nome}
      </h2>

<<<<<<< HEAD
      <p className="text-sm text-[#1A1A1A]">
        Ano: {carro.ano}
      </p>

      <p className="text-sm text-[#1A1A1A]">
        Km: {carro.km}
      </p>

      <div className="flex justify-between mt-2">

=======
      <p className="text-sm text-[#1A1A1A]">Ano: {carro.ano}</p>
      <p className="text-sm text-[#1A1A1A]">Km: {carro.km}</p>

      <div className="flex justify-between mt-2">
        
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-black transition
          ${curtido ? "bg-red-500" : "bg-[#00D084]"}`}
        >
          🔥 {likes}
        </button>

<<<<<<< HEAD
        <Link href={`/anuncio?id=${carro.id}`}>
          <button className="bg-[#00C2CB] px-4 py-1 rounded hover:bg-[#00B0B5] transition text-lg text-[#1A1A1A]">
=======
        <Link href="/anuncio">
          <button
            onClick={handleVerAnuncio}
            className="bg-[#00C2CB] px-4 py-1 rounded hover:bg-[#00B0B5] transition text-lg text-[#1A1A1A]"
          >
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
            Ver anúncio
          </button>
        </Link>

      </div>
<<<<<<< HEAD

=======
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
    </div>
  );
};