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
    const usuario = localStorage.getItem("usuario");
    const todos = JSON.parse(localStorage.getItem("anuncios") || "[]");

    const meus = todos.filter((a: any) => a.usuario === usuario);
    setAnuncios(meus);
  }, []);

  const calcularDias = (data: string) => {
    const hoje = new Date();
    const criado = new Date(data);
    const diff = hoje.getTime() - criado.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const salvarOferta = (index: number) => {
    if (!valorPrazo || !parcelas) {
      alert("Preencha todos os campos!");
      return;
    }

    const todos = JSON.parse(localStorage.getItem("anuncios") || "[]");
    const usuario = localStorage.getItem("usuario");

    const meus = todos.filter((a: any) => a.usuario === usuario);
    const anuncioAtual = meus[index];

    const iReal = todos.findIndex(
      (a: any) =>
        a.modelo === anuncioAtual.modelo &&
        a.usuario === anuncioAtual.usuario
    );

    if (iReal !== -1) {
      todos[iReal].aprazo = valorPrazo;
      todos[iReal].parcelas = parcelas;

      localStorage.setItem("anuncios", JSON.stringify(todos));
    }

    setMostrarOferta(null);
    setValorPrazo("");
    setParcelas("");
    window.location.reload();
  };

  const ativarAnuncio = (index: number) => {
    const todos = JSON.parse(localStorage.getItem("anuncios") || "[]");
    const usuario = localStorage.getItem("usuario");

    const meus = todos.filter((a: any) => a.usuario === usuario);
    const anuncioAtual = meus[index];

    const iReal = todos.findIndex(
      (a: any) =>
        a.modelo === anuncioAtual.modelo &&
        a.usuario === anuncioAtual.usuario
    );

    if (iReal !== -1) {
      todos[iReal].status = "aprovado";
      localStorage.setItem("anuncios", JSON.stringify(todos));
    }

    window.location.reload();
  };

  const excluir = (index: number) => {
    const usuario = localStorage.getItem("usuario");
    const todos = JSON.parse(localStorage.getItem("anuncios") || "[]");

    const meus = todos.filter((a: any) => a.usuario === usuario);
    const anuncioRemover = meus[index];

    const atualizados = todos.filter(
      (a: any) =>
        !(
          a.modelo === anuncioRemover.modelo &&
          a.usuario === anuncioRemover.usuario
        )
    );

    localStorage.setItem("anuncios", JSON.stringify(atualizados));
    window.location.reload();
  };

  return (
    <div className="min-h-screen py-20 flex flex-col items-center text-[#1A1A1A]">

        {anuncios.length === 0 && (
        <p className="text-gray-500 mt-4 text-lg">
            Nenhum anúncio encontrado
        </p>
        )}

      {anuncios.map((a, i) => (
        <div key={i} className="bg-white w-[900px] rounded-xl shadow p-6 mb-6">

          <div className="flex justify-between">

            {/* ESQUERDA */}
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

              <div className="flex gap-2 mt-4">
                {(a.imagens || []).map((img: string, imgIndex: number) => (
                  <img
                    key={imgIndex}
                    src={img}
                    className="w-32 h-24 object-cover rounded-md border shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col gap-4 items-end">

              {/* À VISTA */}
              <div className="bg-[#00C2CB] px-6 py-3 rounded-lg shadow-md flex justify-between items-center w-[280px] hover:bg-[#00B0B5] transition">
                <span className="font-extrabold text-xl">
                  R$ {a.avista}
                </span>
                <span className="text-sm">À vista</span>
              </div>

              {/* A PRAZO */}
              {a.aprazo && (
                <div className="bg-[#00C2CB] px-6 py-3 rounded-lg shadow-md flex justify-between items-center w-[280px] hover:bg-[#00B0B5] transition">
                  <span className="font-extrabold text-xl">
                    R$ {a.aprazo}
                  </span>
                  <span className="text-sm text-right">
                    {a.parcelas}<br />À prazo
                  </span>
                </div>
              )}

              {/* BOTÃO */}
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

              {/* FORM */}
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
                    onClick={() => salvarOferta(i)}
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Salvar oferta
                  </button>

                </div>
              )}

              <hr className="w-full border-gray-300 my-1" />

              {/* AÇÕES */}
              <div className="flex gap-3 mt-3">

                <button
                  onClick={() => {
                    if (confirm("Deseja realmente cancelar este anúncio?")) {
                      excluir(i);
                    }
                  }}
                  className="bg-red-500 px-6 py-2 rounded-lg font-semibold shadow w-[215px] hover:bg-red-600 transition"
                >
                  Cancelar Anúncio
                </button>

              </div>

            </div>
          </div>

          {/* CARD INFERIOR */}
          <div className="bg-white w-full rounded-xl shadow p-4 mt-4 flex justify-between items-center">

            <button
              onClick={() => router.push(`/insights?usuario=${a.usuario}`)}
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
      ))}

      {/* VOLTAR */}
      <button
        onClick={() => router.push("/")}
        className="bg-orange-500 px-6 py-2 rounded mt-6 font-semibold hover:bg-orange-600 transition"
      >
        ← Voltar
      </button>

    </div>
  );
}