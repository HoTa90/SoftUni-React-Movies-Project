import { useEffect, useState } from "react";
import HeroCard from "../HeroCard.jsx";
import Spinner from "../loading/Spinner.jsx";
import { fetchMovies, fetchMoviesByGenre, searchMovie } from "../../api/movieService.js";
import Pagination from "./Pagination.jsx";
import FilterNavBar from "./FilterNavBar.jsx";
import { getGenreName } from "../../utils/helper.js";

export default function AllMovies() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        if (searchQuery) {
            searchMovie(searchQuery, currentPage)
                .then((data) => setMovies(data.results))
                .catch(setErrorMessage)
                .finally(() => setIsLoading(false));
        } else if (selectedGenre) {
            fetchMoviesByGenre(selectedGenre, currentPage)
                .then((data) => setMovies(data.results))
                .catch(setErrorMessage)
                .finally(() => setIsLoading(false));
        } else {
            fetchMovies(currentPage, "desc")
                .then((data) => setMovies(data.results))
                .catch(setErrorMessage)
                .finally(() => setIsLoading(false));
        }
    }, [currentPage, selectedGenre, searchQuery]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const searchMoviesHandler = async (formData) => {
        const { query } = Object.fromEntries(formData);
        setSearchQuery(query);
        setSelectedGenre(null);
        setCurrentPage(1);
    };

    const genreSelectHandler = (genreId) => {
        setSelectedGenre(genreId);
        setSearchQuery("");
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar (Filters) */}
            <div className="w-64 p-4">
                <FilterNavBar onGenreSelect={genreSelectHandler} />
            </div>

            {/* Main Movie Content */}
            <div className="flex-1 p-6">
                {/* Search Bar */}
                <div className="flex justify-center items-center py-6">
                    <form action={searchMoviesHandler} className="w-1/2">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                type="search"
                                required
                                name="query"
                                placeholder="Search"
                                className="w-full"
                            />
                        </label>
                    </form>
                </div>

                {/* All Movies Section */}
                <section className="px-4 py-10">
                    <h2 className="text-white text-2xl font-bold mb-8">
                        {searchQuery
                            ? `Search Results for "${searchQuery}"`
                            : selectedGenre
                            ? `Every ${getGenreName(selectedGenre)} Movie`
                            : "All Movies"}
                    </h2>
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
                            <Pagination
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                hasNextPage={movies.length === 20}
                            />
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}