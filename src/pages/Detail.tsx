"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchMultiplePages } from "@/api"
import type { movie } from "../types/movie";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

interface DetailProps {
  id: string;
}

export default function Detail({ id }: DetailProps) {
    const [movies, setMovies] = useState<movie | null>(null);
    
    useEffect(() => {
        async function getMovie(): Promise<void> {
            const movies = await fetchMultiplePages();
            const findMovie = movies.find((m) => m.id === Number(id));

            setMovies(findMovie || null);
        }
        getMovie();
    }, [id])

    if (!movies) {
        return <p className="font-customBold text-center text-black dark:text-white mt-10">영화를 찾을 수 없습니다.</p>;
    }

    return(
        <div className="movie-container flex flex-col lg:flex-row items-center justify-center lg:items-start px-6 md:px-20 lg:px-60 py-16 lg:py-32 
                        bg-white dark:bg-black text-black dark:text-white">
            <img 
                src={IMG_BASE_URL + movies.poster_path} 
                alt="영화 포스터"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md object-cover shadow-lg"
            />
            <div className="movie-info mt-8 lg:mt-0 lg:ml-16 text-center lg:text-left">
                <h2 className="font-customBold text-2xl md:text-3xl lg:text-4xl mb-4">
                    {movies.title}
                </h2>
                <span className="font-customRegular text-lg md:text-xl text-black dark:text-yellow-400 mb-4 block">
                    ⭐ {movies.vote_average}
                </span>
                <h3 className="font-customRegular text-base md:text-lg text-gray-900 dark:text-gray-400 mb-4">
                    개봉일: {movies.release_date}
                </h3>
                <h3 className="font-customRegular text-lg md:text-lg text-gray-900 dark:text-gray-300 leading-relaxed max-w-full lg:max-w-2xl mx-auto">
                    {movies.overview}
                </h3>
            </div>
        </div>
    )
}