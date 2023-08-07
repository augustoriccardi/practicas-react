import { useRef, useState, useMemo, useCallback } from "react";
import withResults from "../mocks/with-results.json";
import withoutResults from "../mocks/no-results.json";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch?.current === search) {
      return;
      // search es ''
    }
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      // tanto en el try como en el catch
      setLoading(false);
    }
  }, []);

  // const getMovies = useMemo(() => {
  //   return async ({ search }) => {
  //     ...codigo
  //   };
  // }, [search]);

  const sortedMovies = useMemo(() => {
    console.log("memoSortedMovies");
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
