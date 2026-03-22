"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnuncioDetalhe() {

  const [tipo, setTipo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userTipo = localStorage.getItem("tipo");

    if (!userTipo) {
      alert("Você precisa estar logado para ver este anúncio!");
      router.push("/login");
    } else {
      setTipo(userTipo);
    }
  }, []);

  // evita render antes da verificação
  if (!tipo) return null;

  return (
    <div className="flex flex-col items-center py-10 min-h-screen text-[#1A1A1A]">

      {/* CARD PRINCIPAL */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-6 flex gap-8">

        {/* IMAGEM */}
        <img
          src="/images/gol-quadrado.jpg"
          className="w-[400px] h-[260px] object-cover rounded-lg border"
        />

        {/* INFO */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold mb-4">VW Gol 1000</h1>

            <div className="grid grid-cols-2 gap-x-20 gap-y-2 text-sm">
              <p><b>Ano:</b> 1995</p>
              <p><b>Cidade:</b> Curitiba-PR</p>

              <p><b>Km:</b> 134.215</p>
              <p><b>Cor:</b> Champanhe</p>

              <p><b>Combustível:</b> Gasolina</p>
              <p><b>Motor:</b> AP 1.0</p>
            </div>
          </div>

          {/* PREÇO */}
          <div className="mt-4">
            <div className="bg-[#00C2CB] text-center py-3 rounded-lg text-xl font-bold">
              R$ 44.900
            </div>

            <button className="mt-3 bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded font-semibold">
              Ver mais ofertas do vendedor
            </button>
          </div>

        </div>
      </div>

      {/* CONTATO */}
      <div className="bg-white w-full max-w-[900px] mt-4 rounded-xl shadow-md p-4 flex gap-4">

        <div className="flex flex-col gap-2 w-1/3">
          <input placeholder="Nome*" className="border p-2 rounded" />
          <input placeholder="E-mail*" className="border p-2 rounded" />
          <input placeholder="Telefone*" className="border p-2 rounded" />
        </div>

        <textarea
          className="border p-2 border-black rounded w-2/3 text-sm text-gray-700"
          defaultValue="Olá, tenho interesse no veículo. Por favor entre em contato."
        />

        <button className="bg-green-500 hover:bg-green-600 text-[#1A1A1A] px-6 rounded font-bold">
          Enviar mensagem
        </button>

      </div>

      {/* VOLTAR */}
      <Link href="/" className="mt-6">
        <button className="bg-[#FF6A00] px-6 py-2 rounded flex items-center gap-2">
          <ArrowLeft size={18}/>
          Voltar
        </button>
      </Link>

    </div>
  );
}