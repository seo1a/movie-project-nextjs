"use client";

import { useState, useEffect, useReducer, useMemo, createContext } from "react";
import ReactGA from "react-ga4";
import usePageTracking from "@/hooks/usePageTracking";
import { fetchMultiplePages } from "@/api";
import { favoritesReducer, isFavorite } from "@/pages/Favorite";
import type { movie } from "@/types/movie";

type Action =
  | { type: "ADD"; movie: movie }
  | { type: "REMOVE"; id: number }
  | { type: "LOAD"; movies: movie[] };

interface GlobalContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  allMovies: movie[];
  filteredMovies: movie[];
  searchResults: movie[];
  setSearchResults: React.Dispatch<React.SetStateAction<movie[]>>;
  sortedMovies: movie[];
  favorites: movie[];
  dispatch: React.Dispatch<Action>;
  isFavorite: typeof isFavorite;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID!);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("");
  const [allMovies, setAllMovies] = useState<movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<movie[]>([]);
  const [searchResults, setSearchResults] = useState<movie[]>([]);

  usePageTracking();

  useEffect(() => {
    fetchMultiplePages().then((movies) => {
      setAllMovies([...movies]);
      setFilteredMovies([...movies]);
      setSearchResults([...movies]);
    });
  }, []);

  useEffect(() => {
    if (value.trim() === "") {
      setFilteredMovies([...allMovies]);
    } else {
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase().replace(" ", ""))
      );
      setFilteredMovies(filtered);
    }
  }, [value, allMovies]);


  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      dispatch({ type: "LOAD", movies: JSON.parse(saved) });
    }
  }, []);

  const [sortType] = useState<"default" | "rating" | "latest" | "oldest">("default");

  const sortedMovies = useMemo<movie[]>(() => {
    let sorted = [...filteredMovies];

    if (sortType === "rating") {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortType === "latest") {
      sorted.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    } else if (sortType === "oldest") {
      sorted.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      );
    }

    return sorted;
  }, [filteredMovies, sortType]);

  return (
    <GlobalContext.Provider
      value={{
        value,
        setValue,
        allMovies,
        filteredMovies,
        searchResults,
        setSearchResults,
        sortedMovies,
        favorites,
        dispatch,
        isFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
