"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlobalContext } from "@/app/providers";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const {
    value,
    setValue,
    filteredMovies,
    setSearchResults,
    allMovies,
  } = useContext(GlobalContext)!;

  const handleLogoClick = () => {
    setValue("");
    setSearchResults(allMovies);
  };

  return (
    <header className="bg-white dark:bg-black p-4 md:p-6">
      <div className="flex flex-col md:flex-row mt-5 justify-between">
        <Link href="/" onClick={handleLogoClick}>
          <div className="flex cursor-pointer items-center gap-4 ml-8">
            <Image
              src="/popcorn.png"
              alt="popcorn logo"
              width={64}
              height={64}
              className="w-12 h-12 md:w-16 md:h-16"
              priority
            />
            <h1 className="font-customLogo text-4xl md:text-6xl text-red-700 mt-3">
              MOVIE PROJECT
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-6 pt-6 pr-6 md:pr-8 lg:pr-8 w-full sm:w-auto">
          <div className="flex-grow">
            <SearchBar
              value={value}
              setValue={setValue}
              filteredMovies={filteredMovies}
              setSearchResults={setSearchResults}
            />
          </div>

          <div className="flex sm:flex-row flex-col sm:justify-center items-center sm:gap-4 gap-2 mt-4">
            <Link href="/favorite">
              <button
                className="cursor-pointer font-customBold 
                w-24 h-10 sm:w-28 sm:h-12 px-4 py-2 
                rounded-lg text-black dark:text-white text-sm md:text-lg 
                bg-gray-300 dark:bg-gray-700 bg-opacity-50 
                transition hover:bg-opacity-70 dark:hover:bg-opacity-70 whitespace-nowrap"
              >
                즐겨찾기❤️
              </button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
