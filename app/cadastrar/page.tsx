"use client";

import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  const handleCadastro = () => {

    if (!nome || !email || !usuario || !senha || !confirmar) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha !== confirmar) {
      setErro("As senhas não coincidem");
      return;
    }

    // 🔥 salva no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const existe = usuarios.find((u: any) => u.usuario === usuario);

    if (existe) {
      setErro("Usuário já existe");
      return;
    }

    usuarios.push({ nome, email, usuario, senha });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 relative text-[#1A1A1A]">

        <Link href="/login" className="absolute top-4 left-4 text-gray-600 hover:text-black">
          <ArrowLeft size={22} />
        </Link>

        <div className="flex flex-col items-center mb-6">
          <UserPlus size={32} className="text-[#00C2CB] mb-2" />
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Cadastrar-se</h1>
        </div>

        <input onChange={(e) => setNome(e.target.value)} className="w-full mb-2 p-2 border rounded text-[#1A1A1A]" placeholder="Nome completo" />
        <input onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded text-[#1A1A1A]" placeholder="Email" />
        <input onChange={(e) => setUsuario(e.target.value)} className="w-full mb-2 p-2 border rounded text-[#1A1A1A]" placeholder="Usuário" />
        <input type="password" onChange={(e) => setSenha(e.target.value)} className="w-full mb-2 p-2 border rounded text-[#1A1A1A]" placeholder="Senha" />
        <input type="password" onChange={(e) => setConfirmar(e.target.value)} className="w-full mb-4 p-2 border rounded text-[#1A1A1A]" placeholder="Confirmar senha" />

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <button
          onClick={handleCadastro}
          className="bg-green-500 w-full py-2 rounded text-white"
        >
          Cadastrar
        </button>

      </div>
    </div>
  );
}