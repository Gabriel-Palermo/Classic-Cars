"use client";

import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!usuario || !senha) {
      setErro("Preencha os campos");
      return;
    }

    console.log("USUARIO:", usuario);
    console.log("SENHA:", senha);

    if (usuario.trim().toLowerCase() === "admin" && senha.trim() === "1234") {
      localStorage.setItem("tipo", "admin");
      localStorage.setItem("usuario", "Administrador");

      router.push("/admin");

      setTimeout(() => {
        window.location.reload();
      }, 100);

      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usuario,
          senha: senha,
        }),
      });

      if (!response.ok) {
        setErro("Usuário ou senha inválidos");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "tipo",
        data.usuario.tipo === "cliente" ? "user" : data.usuario.tipo
      );

      localStorage.setItem("usuario", data.usuario.nome);
      localStorage.setItem("usuarioId", data.usuario.id.toString());

      router.push("/");

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] text-[#1A1A1A]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 relative">
        <Link
          href="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={22} />
        </Link>

        <div className="flex flex-col items-center mb-6">
          <User size={32} className="text-[#00C2CB] mb-2" />

          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            LOGIN
          </h1>
        </div>

        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
          placeholder="Email"
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
          placeholder="Senha"
        />

        {erro && (
          <p className="text-red-500 text-sm mb-3">
            {erro}
          </p>
        )}

        <p className="text-sm text-right text-gray-500 mb-4 hover:underline cursor-pointer">
          Esqueceu a senha?
        </p>

        <div className="flex justify-between gap-3">
          <button
            onClick={handleLogin}
            className="bg-[#00C2CB] hover:bg-[#00aab3] text-white px-4 py-2 rounded-lg w-full transition"
          >
            Entrar
          </button>

          <Link href="/cadastrar" className="w-full">
            <button className="bg-[#FF6A00] hover:bg-[#e65c00] text-white px-4 py-2 rounded-lg w-full transition">
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}