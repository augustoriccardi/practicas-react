import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact)); // Es lo mismo que getRandomFact().then(setFact)
  };

  // para recuperar la cita al cargar la página
  useEffect(refreshFact, []);

  return { fact, refreshFact };
}
