"use client"

import Link from "next/link";


export default function NotFound() {
  return (
    <div className="font-[Poppins] h-screen p-4 overflow-hidden relative">
      {/* Home Link */}
      <Link
        href="/"
        className="border-2 border-[#555] px-3 py-2 fixed z-10 text-[#555] no-underline flex items-center transition-all duration-150 hover:text-[#333] hover:bg-[#dadada] hover:border-transparent rounded-lg"
      >
        <svg
          height="0.8em"
          width="0.8em"
          viewBox="0 0 2 1"
          preserveAspectRatio="none"
          className="mr-2"
        >
          <polyline
            fill="none"
            stroke="#777777"
            strokeWidth="0.1"
            points="0.9,0.1 0.1,0.5 0.9,0.9"
            className="transition-all duration-150 group-hover:stroke-black"
          />
        </svg>
        Home
      </Link>

      {/* Background Wrapper */}
      <div className="w-full h-[90vh] flex justify-center items-center select-none overflow-hidden">
        <h1
          className="font-[Eczar] text-[25vmax] text-[#282828] tracking-[0.025em] m-0 transition-all duration-700 ease-in-out"
        >
          404
        </h1>
      </div>

      {/* Error Message */}
      <p className="text-[#727272] text-[calc(1rem+3vmin)] fixed bottom-4 right-18 m-0 text-right [text-shadow:-1px_-1px_0_#121212,1px_1px_0_#121212,-1px_1px_0_#121212,1px_-1px_0_#121212] w-full sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[25%]">
        The page you're looking for does not exist.
      </p>

      {/* Google Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Eczar:800");
        @import url("https://fonts.googleapis.com/css?family=Poppins:600");
      `}</style>
    </div>
  );
}
