"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Anunciar() {
  const router = useRouter();

  // pessoais
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");

  // veículo
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [renavam, setRenavam] = useState("");
  const [km, setKm] = useState("");
  const [cambio, setCambio] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [carroceria, setCarroceria] = useState("");
  const [cor, setCor] = useState("");
  const [blindado, setBlindado] = useState("");
  const [licenciado, setLicenciado] = useState("");
  const [chassi, setChassi] = useState("");
  const [ipva, setIpva] = useState("");
  const [imagens, setImagens] = useState<string[]>([]);

  // valores
  const [avista, setAvista] = useState("");
  const [aprazo, setAprazo] = useState("");
  const [outros, setOutros] = useState("");

  const handleImagens = (e: any) => {
    const files = Array.from(e.target.files);

    files.forEach((file: any) => {
        if (file.size > 2 * 1024 * 1024) {
        alert("Imagem muito grande (máx 2MB)");
        return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
        setImagens((prev) => [...prev, reader.result as string]);
        };

        reader.readAsDataURL(file);
    });
  };

  const removerImagem = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
};

  const handleSalvar = () => {
    if (!nome || !modelo || !avista) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    const usuario = localStorage.getItem("usuario");

    const novo = {
      nome, cpf, telefone, cidade, uf, endereco, numero, email, info,
      modelo, marca, ano, placa, renavam, km, cambio, combustivel,
      carroceria, cor, blindado, licenciado, chassi, ipva, imagens,
      avista, aprazo, outros,
      usuario
    };

    const anuncios = JSON.parse(localStorage.getItem("anuncios") || "[]");
    anuncios.push(novo);
    localStorage.setItem("anuncios", JSON.stringify(anuncios));

    alert("Anúncio enviado para aprovação!");
    router.push("/meus-anuncios");
  };

  return (
    <div className="min-h-screen py-10 flex flex-col items-center border">

    {/* CARD */}
    <div className="bg-white w-[1100px] rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold text-cyan-500 mb-6">
        Criar anúncio
        </h1>

        <div className="grid grid-cols-2 gap-8 text-[#1A1A1A]">

        {/* ESQUERDA */}
        <div>
            <h2 className="font-bold mb-3 text-xl text-[#1A1A1A]">Informações pessoais</h2>

            <input className="input mb-2" placeholder="Nome completo*" />

            <input className="input mb-2" placeholder="CPF*" />

            <input className="input mb-2" placeholder="Telefone*" />

            <div className="grid grid-cols-[1fr_80px] gap-2 mb-2">
            <input className="input" placeholder="Cidade*" />
            <input className="input text-center" placeholder="UF*" />
            </div>

            <div className="grid grid-cols-[1fr_100px] gap-2 mb-2">
            <input className="input" placeholder="Endereço*" />
            <input className="input text-center" placeholder="Número*" />
            </div>

            <input className="input mb-2" placeholder="Complemento" />

            <input className="input mb-2" placeholder="E-mail*" />

            <textarea className="w-full h-[90px] p-2 border border-[#1A1A1A] rounded-md text-2x1 text-[#1A1A1A]"
            placeholder="Informações adicionais"
            />
        </div>

        {/* DIREITA */}
        <div>
            <h2 className="font-bold mb-3 text-xl text-[#1A1A1A]">Informações do veículo</h2>

            <input className="input mb-2" placeholder="Modelo/Nome*" />

            <div className="grid grid-cols-[1fr_80px] gap-2 mb-2">
            <input className="input" placeholder="Marca*" />
            <input className="input text-center" placeholder="Ano*" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="input" placeholder="Placa do Veículo*" />
            <input className="input" placeholder="Renavam*" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="input" placeholder="Km rodados*" />
            <input className="input" placeholder="Câmbio*" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="input" placeholder="Combustível*" />
            <input className="input" placeholder="Carroceria*" />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
            <input className="input" placeholder="Cor*" />
            <input className="input" placeholder="Blindado*" />
            <input className="input" placeholder="Licenciado*" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="input" placeholder="Chassi*" />
            <select className="input">
                <option>IPVA*</option>
                <option>Pago</option>
                <option>Pendente</option>
                <option>Isento</option> 
            </select>
            </div>

            {/* UPLOAD */}
            <div className="mt-3">
            <p className="font-semibold mb-2">Adicionar imagens do veículo</p>

            <div className="flex items-center gap-3 flex-wrap">

                {/* IMAGENS */}
                {imagens.map((img, index) => (
                <div key={index} className="relative">

                    <img
                    src={img}
                    className="w-16 h-16 object-cover rounded-md border"
                    />

                    {/* BOTÃO REMOVER */}
                    <button
                    onClick={() => removerImagem(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                    ✕
                    </button>

                </div>
                ))}

                {/* BOTÃO ADICIONAR */}
                <label className="cursor-pointer">
                <div className="w-16 h-16 bg-cyan-500 rounded-md flex items-center justify-center text-white text-2xl">
                    +
                </div>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImagens}
                />
                </label>

            </div>
            </div>

        </div>
        </div>
    </div>

    {/* VALORES */}
    <div className="bg-white w-[1100px] rounded-xl shadow p-6 mt-6 text-[#1A1A1A]">

        <h2 className="font-bold mb-4 text-xl text-[#1A1A1A]">
        Adicionar Valores ao Veículo
        </h2>

        <div className="space-y-3">

        <div className="grid grid-cols-[140px_1fr] gap-3 items-center">
            <div className="bg-green-400 px-3 py-1 rounded-md font-semibold text-sm flex justify-between hover:bg-green-500 text-[#1A1A1A]">
            À vista <span>›</span>
            </div>
            <input className="input" placeholder="R$" />
        </div>

        <div className="grid grid-cols-[140px_1fr_80px] gap-3 items-center">
            <div className="bg-yellow-300 px-3 py-1 rounded-md font-semibold text-sm flex justify-between hover:bg-yellow-400 text-[#1A1A1A]">
            À prazo <span>›</span>
            </div>
            <input className="input" placeholder="R$" />
            <select className="input text-center">
            <option>X12</option>
            <option>X18</option>
            <option>X24</option>
            <option>X32</option>
            <option>X48</option>
            <option>X64</option>
            </select>
        </div>

        <div className="grid grid-cols-[140px_1fr] gap-3 items-center text-[#1A1A1A]">
            <div className="bg-purple-400 px-3 py-1 rounded-md font-semibold text-sm flex justify-between text-[#1A1A1A] hover:bg-purple-500">
            Outros <span>›</span>
            </div>
            <input className="input" placeholder="R$" />
        </div>

        </div>
    </div>

    {/* BOTÕES */}
    <div className="flex gap-6 mt-6 text-[#1A1A1A]">

        <button className="bg-green-500 px-8 py-3 rounded-lg shadow font-bold flex items-center gap-2 hover:bg-green-600">
        ✔ Enviar para aprovação
        </button>

        <button className="bg-orange-500 px-8 py-3 rounded-lg shadow font-bold flex items-center gap-2 hover:bg-orange-600">
        ← Cancelar e voltar
        </button>

    </div>

    </div>
  );
}