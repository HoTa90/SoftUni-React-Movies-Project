import { useEffect, useState } from "react";
import HeroCard from "../HeroCard.jsx";
import Spinner from "../loading/Spinner.jsx"; // Ensure you import Spinner
import { fetchMovies } from "../../api/movieService.js";
import Pagination from "./Pagination.jsx";

export default function AllMovies() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        setIsLoading(true)
        fetchMovies(currentPage, 'desc')
            .then(data => (setMovies(data.results)))
            .catch(setErrorMessage)
            .finally(setIsLoading(false))
    }, [currentPage])

    console.log(movies)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const searchMoviesHandler = (query) => {
        console.log(Object.fromEntries(query));
    };

    console.log(movies.length)

    return (
        <div>
            {/* Search Form */}
            <div className="flex justify-center items-center py-6">
                <form
                    action={searchMoviesHandler}
                    className="w-1/2"
                >
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            type="search"
                            required
                            placeholder="Search"
                            className="w-full"
                        />
                    </label>
                </form>
            </div>
            <section className="px-4 py-10">
                {/* All Movies Section */}
                <h2 className="text-white text-2xl font-bold mb-8">All Movies</h2>
                {isLoading ? (
                    <Spinner />
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                            {movies && movies.map((movie) => (
                                <li key={movie.id} className="p-2">
                                    <HeroCard data={movie} type="movie" />
                                </li>
                            ))}
                        </ul>
                        <Pagination currentPage={currentPage} onPageChange={handlePageChange} hasNextPage={movies.length === 20} />
                    </>
                )}
            </section>
        </div>

    );
}