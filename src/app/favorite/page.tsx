"use client";

import { useContext } from "react";
import Favorite from "@/pages/Favorite";
import { GlobalContext } from "../providers";

export default function Page() {
  const ctx = useContext(GlobalContext)!;

  return (
    <Favorite
      favorites={ctx.favorites}
      dispatch={ctx.dispatch}
    />
  );
}
