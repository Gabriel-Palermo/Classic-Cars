import Image from "next/image";

export default function Contatos() {
  return (
    <div className="flex justify-center mt-10 px-6">

      <div className="bg-white rounded-xl shadow-md w-full max-w-5xl p-10">

        <div className="flex justify-between items-center gap-10">

          {/* ESQUERDA */}
          <div className="flex flex-col gap-6 max-w-md">

            <h1 className="text-3xl font-bold text-[#1A1A1A] text-2x1">Sobre</h1>

            <p className="text-[#1A1A1A]">
              A Classic Cars – Anúncio de Veículos nasceu com a paixão por carros clássicos e nacionais que marcaram época.
              Trabalhamos com transparência, qualidade e procedência garantida.
            </p>

            <p className="text-cyan-400 text-xl border-l-4 border-cyan-400 pl-4">
              Entre em contato conosco e encontre o seu próximo clássico.
            </p>

            {/* CONTATOS */}
            <div className="flex flex-col gap-3 mt-4 text-[#1A1A1A] text-xl">

              <p>📞  (00) 0000-0000</p>
              <p>✉️  carsclassic@classic.com</p>
              <p>📸  @classic.cars</p>
              <p>📘  @classic.cars</p>

            </div>
          </div>

          {/* DIREITA (LOGO GRANDE) */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Logo Classic Cars"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>

        </div>

        {/* BARRA AZUL EMBAIXO */}
        <div className="mt-10 h-4 bg-cyan-400 rounded-b-lg"></div>

      </div>

    </div>
  );
}