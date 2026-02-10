"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
    /*
        useState()에 화살표함수 사용 => 렌더링 최적화
        (useState()의 인자로 일반 값을 넣으면 렌더링마다 계산이 이루어짐.
        비용이 많이 드는 연산(예: localStorage 조회)을 할 경우, 불필요한 연산을 방지하기 위해 함수로 감쌈.
        useState()가 처음 실행될 때 한 번만 실행됨.)
     */
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    // 클라이언트에서만 실행
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const initial = saved === "light" ? "light" : "dark";
        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    // theme 변경 시 저장
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="cursor-pointer font-customBold 
          w-24 h-10 sm:w-28 sm:h-12 px-4 py-2 
          rounded-lg text-black dark:text-white text-sm md:text-lg 
          bg-gray-300 dark:bg-gray-700 bg-opacity-50 
          items-center transition hover:bg-opacity-70 dark:hover:bg-opacity-70 whitespace-nowrap"
        >
          {theme === "dark" ? "Light🌞" : "Dark🌙"}
        </button>
      );
}
