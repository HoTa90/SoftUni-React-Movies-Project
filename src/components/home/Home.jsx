import React, { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection.jsx";
import PopularSection from "./PopularSection.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import HomeSkeleton from "../loading/HomeSkeleton.jsx";

export default function Home() {
    const [headerMovies, setHeaderMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
    const { getTrending, getDetails, isPending, error } = useFetch();

    useEffect(() => {
        const fetchAllTrendingData = async () => {
            try {
                const [movies, tvShows, people] = await Promise.all([
                    getTrending('movie'),
                    getTrending('tv'),
                    getTrending('person')
                ]);

                setTrendingMovies(movies);
                setTrendingTV(tvShows);
                setTrendingPeople(people);

                if (movies.length > 0) {
                    const headerMoviesData = movies.slice(0, 10);
                    const moviesDetails = await Promise.all(
                        headerMoviesData.map(movie => getDetails('movie', movie?.id))
                    )
                    setHeaderMovies(moviesDetails)
                }
            } catch (err) {
                console.error("Error fetching trending data:", err);
            }
        };

        fetchAllTrendingData();
    }, [getTrending, getDetails]);



    return (
        <>
            {isPending ? (<HomeSkeleton />)
                :
                <>
                    <HeaderSection movies={headerMovies} />
                    <PopularSection
                        trendingMovies={trendingMovies}
                        trendingTV={trendingTV}
                        trendingPeople={trendingPeople}
                        errorMessage={error}
                        isLoading={isPending}
                    />
                </>
            }

        </>
    );
}