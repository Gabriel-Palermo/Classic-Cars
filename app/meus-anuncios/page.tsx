"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MeusAnuncios() {

    const router = useRouter();

    const anuncioMock = {
        nome: "VW Gol GTI 2.0",
        ano: "1994",
        km: "124116",
        combustivel: "Gasolina/Álcool",
        cidade: "Paranaguá-PR",
        motor: "AP 2.0",
        cor: "Azul Marinho",

        precoAvista: "124.900",
        precoPrazo: "149.900",
        parcelas: "36x",

        imagens: [
            "/images/gol-1.jpg",
            "/images/gol-2.jpg",
            "/images/gol-3.jpg"
        ],

        data: "02/02/2026",
        dias: "26"
    };

  const [anuncios, setAnuncios] = useState<any[]>([]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    const todos = JSON.parse(localStorage.getItem("anuncios") || "[]");

    const meus = todos.filter((a: any) => a.usuario === usuario);

    setAnuncios(meus);
  }, []);

  const excluir = (index: number) => {
    const todos = JSON.parse(localStorage.getItem("anuncios") || "[]");

    todos.splice(index, 1);

    localStorage.setItem("anuncios", JSON.stringify(todos));

    window.location.reload();
  };

  return (
    <div className="min-h-screen py-20 flex flex-col items-center text-[#1A1A1A]">

    {/* CARD PRINCIPAL */}
    <div className="bg-white w-[900px] rounded-xl shadow p-6">

        <div className="flex justify-between">

        {/* ESQUERDA */}
        <div>
            <h1 className="text-2xl font-bold mb-3">
            {anuncioMock.nome}
            </h1>

            <p><b>Ano:</b> {anuncioMock.ano}</p>
            <p><b>Km:</b> {anuncioMock.km}</p>
            <p><b>Combustível:</b> {anuncioMock.combustivel}</p>
            <p><b>Cidade:</b> {anuncioMock.cidade}</p>
            <p><b>Motor:</b> {anuncioMock.motor}</p>
            <p><b>Cor:</b> {anuncioMock.cor}</p>

            {/* IMAGENS */}
            <div className="flex gap-2 mt-4">
            {anuncioMock.imagens.map((img, i) => (
                <img
                key={i}
                src={img}
                className="w-32 h-24 object-cover rounded-md border shadow-sm"
                />
            ))}
            <div className="flex items-center justify-center w-8 text-lg font-bold text-[#1A1A1A]">
            +
            </div>
            </div>
        </div>

        {/* DIREITA */}
        <div className="flex flex-col gap-4 items-end">

        {/* À VISTA */}
        <div className="bg-[#00C2CB] px-6 py-3 rounded-lg shadow-md flex justify-between items-center w-[280px] hover:bg-[#00B0B5] transition">
            <span className="font-extrabold text-xl">
            R$ {anuncioMock.precoAvista}
            </span>
            <span className="text-sm">À vista</span>
        </div>

        {/* A PRAZO */}
        <div className="bg-[#00C2CB] px-6 py-3 rounded-lg shadow-md flex justify-between items-center w-[280px] hover:bg-[#00B0B5] transition">
            <span className="font-extrabold text-xl">
            R$ {anuncioMock.precoPrazo}
            </span>
            <span className="text-sm text-right leading-tight">
            {anuncioMock.parcelas}<br />Financiado
            </span>
        </div>

        {/* BOTÃO */}
        <button className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-lg shadow-md font-semibold w-[280px]">
            Adicionar mais OFERTAS
        </button>

        <hr className="w-full border-gray-300 my-1" />

        {/* AÇÕES */}
        <div className="flex gap-3 mt-3">

            <button className="bg-red-500 hover:bg-red-600 transition px-6 py-2 rounded-lg font-semibold shadow w-[215px]">
            Cancelar Anúncio
            </button>

            <button className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-lg font-bold shadow">
            ✔
            </button>

        </div>

        </div>
        </div>
    </div>

    {/* CARD INFERIOR */}
    <div className="bg-white w-[900px] rounded-xl shadow p-4 mt-4 flex justify-between items-center">

        <button
            onClick={() => router.push("/insights")}
            className="bg-cyan-400 px-4 py-2 rounded hover:bg-cyan-500 transition font-semibold shadow"
            >
            Ver insights
        </button>

        <span>Anunciado {anuncioMock.data}</span>

        <span>{anuncioMock.dias} dias anunciados</span>

    </div>

    {/* VOLTAR */}
    <button className="bg-orange-500 px-6 py-2 rounded mt-6 font-semibold">
        ← Voltar
    </button>

    </div>
  );
}