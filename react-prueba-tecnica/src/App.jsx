import "./App.css";
import { useState, useEffect } from "react";

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`;
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`;
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function App() {
  const [fact, setFact] = useState("Lorem impsum cat fact whatever");
  const [imageUrl, setImageUrl] = useState(null);

  const getRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  };

  // para recuperar la cita al cargar la página
  useEffect(getRandomFact, []);

  //para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;
    const threeFirstWords = fact.split(" ", 3).join(); // Si son más palabras se puede con split y segundo parametro, o slice y join
    console.log(threeFirstWords);
    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={getRandomFact}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
            alt={`image of a cat extracted using the first three words of the fact ${fact}`}
          />
        )}
      </section>
    </main>
  );
}
