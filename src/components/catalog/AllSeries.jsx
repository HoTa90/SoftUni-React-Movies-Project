import { useEffect, useState } from "react";
import HeroCard from "../HeroCard.jsx";
import Spinner from "../loading/Spinner.jsx";
import Pagination from "./Pagination.jsx";
import FilterNavBar from "./FilterNavBar.jsx";
import { getGenreName } from "../../utils/helper.js";
import { useFetch } from "../../hooks/useFetch.js";

export default function AllSeries() {

    const [series, setSeries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const {isPending, error, searchTV, getTVByGenre, getSeries } = useFetch()


    useEffect(() => {
        if (searchQuery) {
            searchTV(searchQuery, currentPage)
                .then(setSeries)
        } else if (selectedGenre) {
            getTVByGenre(selectedGenre, currentPage)
                .then(setSeries)
     
        } else {
            getSeries(currentPage, "desc")
                .then(setSeries)

        }
    }, [currentPage, selectedGenre, searchQuery, searchTV, getTVByGenre, getSeries]);

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

    useEffect(() => {
        window.scroll(0,0)
    }, [currentPage])

    return (
        <div className="min-h-screen flex">
            {/* Sidebar (Filters) */}
            <div className="w-64 p-4">
                <FilterNavBar onGenreSelect={genreSelectHandler} isMovie={false} />
            </div>

            <div className="flex-1 p-6">
                {/* Search Bar */}
                <div className="flex justify-center items-center py-6  ">
                    <form action={searchMoviesHandler} className="w-2/3">
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
                                placeholder="Search by TV title"
                                className="w-full bg-[#2c2c2c]"
                            />
                        </label>
                    </form>
                </div>

                {/* All TV Series Section */}
                <section className="px-4 py-10">
                    <h2 className="text-white text-3xl font-bold pb-5 flex justify-self-center ">
                        {searchQuery
                            ? `Search Results for "${searchQuery}"`
                            : selectedGenre
                            ? `Every ${getGenreName(selectedGenre)} TV Series`
                            : "All TV Series"}
                    </h2>
                    {isPending ? (
                        <Spinner />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                                {series && series.map((item) => (
                                    <li key={item.id} className="p-2">
                                        <HeroCard data={item} type="tv" />
                                    </li>
                                ))}
                            </ul>
                            <Pagination
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                hasNextPage={series?.length === 20}
                            />
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}