import { useEffect } from "react";
import Movie from "../components/Movie";

interface movieType {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;
    [key: string]: any;
}

type Action =
    | { 
        type: "ADD";
        movie: movieType;
    }
    | { type: "REMOVE";
        id: number;
    }
    | { type: "LOAD";
        movies: movieType[];
    };

interface FavoriteProps {
    favorites: movieType[];
    dispatch: React.Dispatch<Action>;
}

// Reducer 함수 : 액션(ADD, REMOVE)을 받아 상태를 업데이트하는 함수
// state: 현재 관심 있는 영화 목록 (favorites 배열)
export function favoritesReducer(state: movieType[], action: Action) {
  switch (action.type) {
    case "ADD": {
      if (!state.some(movie => movie.id === action.movie.id)) {
        const updated = [...state, action.movie];

        if (typeof window !== "undefined") {
          localStorage.setItem("favorites", JSON.stringify(updated));
        }

        return updated;
      }
      return state;
    }
    case "REMOVE": {
      const updated = state.filter(movie => movie.id !== action.id);

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updated));
      }

      return updated;
    }
    case "LOAD":
      return action.movies;

    default:
      return state;
  }
}


// 해당 영화가 즐겨찾기 되어 있는지 true / false 반환
export function isFavorite(favorites: movieType[], id: number): boolean {
    return favorites.some((movie) => movie.id === id);
}

export default function Favorite({ favorites = [], dispatch }: FavoriteProps) {

    // Favorite 페이지 처음 렌더링 될 때 => favorite 전체 목록 불러와 렌더링
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if(savedFavorites) {
            dispatch({ type: "LOAD", movies: JSON.parse(savedFavorites)});
        }
    }, [dispatch])

    return(
        <div className="flex bg-white dark:bg-black min-h-screen justify-center px-12 py-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3">
                {(favorites ?? []).length === 0 ? (
                    <p className="font-customBold text-center col-span-full text-lg text-gray-400">관심 있는 영화가 없슴다 -.-;;</p>
                ) : (
                    favorites.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.posterPath}
                            voteAvg={movie.voteAvg}
                            dispatch={dispatch}
                            isFavorite={isFavorite(favorites, movie.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}