
import { Link } from "react-router";
import { imagePathOriginal, minutesTohours } from "../../utils/helper.js";
import { useEffect, useRef, useState, useCallback } from "react";

export default function HeaderSection({ movies = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);;
  const timeoutRef = useRef(null);


  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const startAutoPlay = useCallback(() => {
    resetTimeout();;
    timeoutRef.current = setTimeout(
      () => {
        setCurrentIndex(prev => (prev + 1) % movies.length);
      },
      10000
    );
  }, [movies.length]);

  useEffect(() => {
    if (movies.length > 0 && isAutoPlaying) {
      startAutoPlay();
    }
    return () => resetTimeout();
  }, [isAutoPlaying, movies.length, startAutoPlay, currentIndex]);

  const goToSlide = useCallback((index) => {
    resetTimeout();
    setCurrentIndex(index);
    setIsAutoPlaying(true);
    startAutoPlay();
  }, [startAutoPlay]);


  const goToPrevious = () => goToSlide(
    currentIndex === 0 ? movies.length - 1 : currentIndex - 1
  );

  const goToNext = () => goToSlide(
    currentIndex === movies.length - 1 ? 0 : currentIndex + 1
  );

  const currentMovie = movies[currentIndex] || {};


  return (
    <div className="relative min-h-[90vh] bg-cover bg-center shadow-2xl shadow-[#a8b5db]/30 overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out 
           ${index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
            style={{
              backgroundImage: movie.backdrop_path
                ? `url(${imagePathOriginal}/${movie.backdrop_path})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50 shadow-lg"></div>
      </div>

      {/* Content */}
      <div className="relative w-full px-15 md:px-35 flex flex-col lg:flex-row items-center justify-between py-8 space-y-6 lg:space-y-0 lg:space-x-12 z-10 transition-all duration-1000 ease-in-out">
        <div className="max-w-xl text-white">
          <h1 className="mt-4 text-5xl font-extrabold text-balance">{currentMovie?.title}</h1>
          <p className="mt-2">
            {currentMovie.release_date ? currentMovie.release_date.split("-")[0] : "N/A"} • {minutesTohours(currentMovie?.runtime)}
          </p>
          <p className="mt-2 text-lg">{currentMovie?.overview}</p>
          <Link to={`/movie/${currentMovie?.id}`} className="btn mt-4 bg-[#2c2c2c] hover:bg-[#4c4c4c]">
            More Details
          </Link>
        </div>


        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start pt-2 order-1 lg:order-2">
          <img
            src={currentMovie?.poster_path
              ? `${imagePathOriginal}/${currentMovie?.poster_path}`
              : "/no-poster.png"}
            alt={currentMovie?.title}
            className="h-auto max-h-[50vh] lg:max-h-[80vh] w-auto object-contain rounded-lg shadow-xl shadow-gray-500/50"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#2c2c2c]/50 hover:bg-[#2c2c2c] text-white p-2 md:p-3 rounded-full transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#2c2c2c]/50 hover:bg-[#2c2c2c] text-white p-2 md:p-3 rounded-full transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className={`rounded-full h-3 w-3 cursor-pointer transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}