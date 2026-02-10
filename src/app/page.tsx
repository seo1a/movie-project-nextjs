"use client";

import { useContext } from "react";
import Home from "@/pages/Home";
import { GlobalContext } from "./providers";

export default function Page() {
  const ctx = useContext(GlobalContext)!;

  return (
    <Home
      searchResults={ctx.sortedMovies ?? []}
      dispatch={ctx.dispatch}
      favorites={ctx.favorites ?? []}
      isFavorite={ctx.isFavorite}
    />
  );
}
