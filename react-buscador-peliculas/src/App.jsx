import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useState, useRef, useCallback } from "react";
import { Movies } from "./components/Movies";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);

  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search");
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <div className="search-form">
          <h1>Buscador de peliculas</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              style={{
                border: "1px solid transparent",
                borderColor: error ? "red" : "transparent",
              }}
              onChange={handleChange}
              value={search}
              name="search"
              placeholder="Search movie..."
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type="submit">Buscar</button>
          </form>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
