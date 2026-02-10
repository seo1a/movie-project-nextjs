import type { movie } from "../src/types/movie"

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

interface TMDBResponse {
    results: movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

// : Promise<Movie[]> : 이 함수가 Movie 객체들의 배열을 담은 Promise를 반환함
export async function fetchMovies(page = 1): Promise<movie[]> {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=ko&page=${page}&region=kr`);
    const data: TMDBResponse = await response.json();
    return data.results;  // 영화 리스트만 반환
}

// ✅ 50개 이상의 영화를 가져오는 함수
export async function fetchMultiplePages(): Promise<movie[]> {
    const movies = new Map();  // 🔹 id를 key로 하는 Map을 사용

    for (let i = 1; i <= 7; i++) {
        const moviesFromPage = await fetchMovies(i);
        moviesFromPage.forEach(movie => {
            movies.set(movie.id, movie);  // 🔹 같은 id가 있으면 덮어쓰기
        });

        if (movies.size >= 100) break;  // 🔹 중복을 고려하여 개수 확인
    }

    return Array.from(movies.values()).slice(0, 100);  // 🔹 중복 제거 후 배열 변환
}


fetchMultiplePages().then(movies => console.log(movies));