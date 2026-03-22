"use client";

import { createContext, useContext, useState } from "react";

type BuscaContextType = {
  busca: string;
  setBusca: (value: string) => void;
};

const BuscaContext = createContext<BuscaContextType | null>(null);

export const BuscaProvider = ({ children }: { children: React.ReactNode }) => {
  const [busca, setBusca] = useState("");

  return (
    <BuscaContext.Provider value={{ busca, setBusca }}>
      {children}
    </BuscaContext.Provider>
  );
};

export const useBusca = () => {
  const context = useContext(BuscaContext);
  if (!context) throw new Error("useBusca precisa estar dentro do Provider");
  return context;
};