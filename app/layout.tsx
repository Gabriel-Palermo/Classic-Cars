"use client";

import "./globals.css";
import { BuscaProvider } from "./context/BuscaContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { useState } from "react";
import { Racing_Sans_One } from "next/font/google";

const racing = Racing_Sans_One({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [busca, setBusca] = useState("");

  return (
    <html lang="pt-br">
      <body className={`${racing.className} bg-[#E5E5E5]`}>
        <BuscaProvider>
          <Navbar />
          <main className="min-h-screen px-6 py-4">
            {children}
          </main>
          <Footer />
        </BuscaProvider>
      </body>
    </html>
  );
}