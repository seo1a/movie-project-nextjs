import Link from "next/link";
import { useCallback } from "react";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

interface MovieProps {
    id: number;
    title: string;
    posterPath: string;
    voteAvg: number;
    dispatch: React.Dispatch<any>;
    isFavorite: boolean;
}

// 영화 제목 글자수 제한
const truncate = (str: string | undefined, n: number): string | undefined => {
    return str && str?.length > n ? str.slice(0, n - 1) + "..." : str;
};

export default function Movie({ 
    id, 
    title, 
    posterPath, 
    voteAvg, 
    dispatch, 
    isFavorite 
}: MovieProps) {
    const handleClick = useCallback(() => {
        if (isFavorite) {
            dispatch({ type: "REMOVE", id });
        } else {
            dispatch({ type: "ADD", movie: { id, title, posterPath, voteAvg } });
        }
    }, [isFavorite, dispatch, id, title, posterPath, voteAvg]);

    return(
        <div className="movie-container text-black dark:text-white w-[140px] md:w-[240px] lg:w-[240px] mx-2 sm:mx-5 my-8 relative group">
            <Link href={`/detail/${id}`}>
                <div className="relative w-full h-0 pb-[150%]">
                    <img 
                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer transition-transform duration-800 group-hover:scale-105" 
                        src={IMG_BASE_URL + posterPath} 
                        alt="영화 포스터"  
                    />
                </div>
            </Link>
            <div className="movie-info pt-3">
                <Link href={`/detail/${id}`}>
                    <h2 className="font-customBold dark:font-customRegular text-[16px] sm:text-[18px] md:text-[22px]">{truncate(title, 15)}</h2>
                </Link>
                <div className="flex justify-between text-[14px] sm:text-[16px] md:text-xl">
                    <span className="font-customRegular">⭐{voteAvg}</span>
                    <span className="cursor-pointer" onClick={handleClick}>
                        {isFavorite ? "❤️" : "🤍"}
                    </span>
                </div>
            </div>     
        </div>
    )
}