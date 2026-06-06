"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MeusAnuncios() {
  const router = useRouter();

  const [anuncios, setAnuncios] = useState<any[]>([]);
  const [mostrarOferta, setMostrarOferta] = useState<number | null>(null);
  const [valorPrazo, setValorPrazo] = useState("");
  const [parcelas, setParcelas] = useState("");

  useEffect(() => {
    carregarMeusAnuncios();
  }, []);

  const carregarMeusAnuncios = async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      if (!usuarioId) {
        alert("Você precisa estar logado.");
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:3001/anuncio");
      const todos = await response.json();

      const meus = todos.filter(
        (a: any) => String(a.usuarioId) === String(usuarioId)
      );

      setAnuncios(meus);
    } catch (error) {
      console.error("Erro ao carregar meus anúncios:", error);
    }
  };

  const calcularDias = (data: string) => {
    const hoje = new Date();
    const criado = new Date(data);
    const diff = hoje.getTime() - criado.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const pegarImagens = (imagens: any) => {
    try {
      if (!imagens) return [];

      if (typeof imagens === "string") {
        return JSON.parse(imagens);
      }

      return imagens;
    } catch {
      return [];
    }
  };

  const salvarOferta = async (id: number) => {
    if (!valorPrazo || !parcelas) {
      alert("Preencha todos os campos!");
      return;
    }

    alert("Oferta salva apenas visualmente nesta etapa.");
    setMostrarOferta(null);
    setValorPrazo("");
    setParcelas("");
  };

  const excluir = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/anuncio/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Erro ao excluir anúncio");
        return;
      }

      setAnuncios((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Erro ao excluir anúncio:", error);
    }
  };

  return (
    <div className="min-h-screen py-20 flex flex-col items-center text-[#1A1A1A]">
      {anuncios.length === 0 && (
        <p className="text-gray-500 mt-4 text-lg">
          Nenhum anúncio encontrado
        </p>
      )}

      {anuncios.map((a, i) => {
        const imagens = pegarImagens(a.imagens);

        return (
          <div key={a.id} className="bg-white w-[900px] rounded-xl shadow p-6 mb-6">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-3">
                  {a.modelo}
                </h1>

                <p><b>Ano:</b> {a.ano}</p>
                <p><b>Km:</b> {a.km}</p>
                <p><b>Combustível:</b> {a.combustivel}</p>
                <p><b>Cidade:</b> {a.cidade}</p>
                <p><b>Motor:</b> {a.motor}</p>
                <p><b>Cor:</b> {a.cor}</p>
                <p><b>Status:</b> {a.status}</p>

                <div className="flex gap-2 mt-4">
                  {imagens.length > 0 ? (
                    imagens.map((img: string, imgIndex: number) => (
                      <img
                        key={imgIndex}
                        src={img}
                        className="w-32 h-24 object-cover rounded-md border shadow-sm"
                        alt="Imagem do veículo"
                      />
                    ))
                  ) : (
                    <img
                      src="/images/sem-imagem.jpg"
                      className="w-32 h-24 object-cover rounded-md border shadow-sm"
                      alt="Sem imagem"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 items-end">
                <div className="bg-[#00C2CB] px-6 py-3 rounded-lg shadow-md flex justify-between items-center w-[280px] hover:bg-[#00B0B5] transition">
                  <span className="font-extrabold text-xl">
                    R$ {a.precoAvista}
                  </span>
                  <span className="text-sm">À vista</span>
                </div>

                {a.precoAprazo && (
                  <div className="bg-[#103C90] px-6 py-3 rounded-lg shadow-md flex justify-between items-center w-[280px] hover:bg-[#0A2A66] transition text-white">
                    <span className="font-extrabold text-xl">
                      R$ {a.precoAprazo}
                    </span>
                    <span className="text-sm text-right">
                      {a.parcelas}<br />Vezes à prazo
                    </span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setMostrarOferta(i);
                    setValorPrazo("");
                    setParcelas("");
                  }}
                  className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold w-[280px] hover:bg-yellow-500 transition"
                >
                  Adicionar mais OFERTAS
                </button>

                {mostrarOferta === i && (
                  <div className="flex flex-col gap-2 w-[280px]">
                    <input
                      placeholder="Valor a prazo"
                      value={valorPrazo}
                      onChange={(e) => setValorPrazo(e.target.value)}
                      className="border p-2 rounded"
                    />

                    <input
                      placeholder="Parcelas (ex: 36x)"
                      value={parcelas}
                      onChange={(e) => setParcelas(e.target.value)}
                      className="border p-2 rounded"
                    />

                    <button
                      onClick={() => salvarOferta(a.id)}
                      className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                      Salvar oferta
                    </button>
                  </div>
                )}

                <hr className="w-full border-gray-300 my-1" />

                <button
                  onClick={() => {
                    if (confirm("Deseja realmente cancelar este anúncio?")) {
                      excluir(a.id);
                    }
                  }}
                  className="bg-red-500 px-6 py-2 rounded-lg font-semibold shadow w-[215px] hover:bg-red-600 transition"
                >
                  Cancelar Anúncio
                </button>
              </div>
            </div>

            <div className="bg-white w-full rounded-xl shadow p-4 mt-4 flex justify-between items-center">
              <button
                onClick={() => router.push(`/insights?id=${a.id}`)}
                className="bg-cyan-400 px-4 py-2 rounded font-semibold shadow hover:bg-cyan-500 transition"
              >
                Ver insights
              </button>

              <span>
                Anunciado{" "}
                {a.dataCriacao
                  ? new Date(a.dataCriacao).toLocaleDateString()
                  : "-"}
              </span>

              <span>
                {a.dataCriacao ? calcularDias(a.dataCriacao) : 0} dias anunciados
              </span>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => router.push("/")}
        className="bg-orange-500 px-6 py-2 rounded mt-6 font-semibold hover:bg-orange-600 transition"
      >
        ← Voltar
      </button>
    </div>
  );
}