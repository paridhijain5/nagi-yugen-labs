import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { cities, type City } from "./nagi-data";

type Ctx = {
  city: City;
  setCity: (id: string) => void;
  dark: boolean;
  toggleDark: () => void;
};

const CityCtx = createContext<Ctx | null>(null);

export function CityProvider({ children }: { children: ReactNode }) {
  const [cityId, setCityId] = useState("tokyo");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const city = cities.find((c) => c.id === cityId) ?? cities[0];

  return (
    <CityCtx.Provider value={{ city, setCity: setCityId, dark, toggleDark: () => setDark((d) => !d) }}>
      {children}
    </CityCtx.Provider>
  );
}

export function useCity() {
  const ctx = useContext(CityCtx);
  if (!ctx) throw new Error("useCity must be inside CityProvider");
  return ctx;
}
