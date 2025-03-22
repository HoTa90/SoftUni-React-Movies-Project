import React, { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection.jsx";
import PopularSection from "./PopularSection.jsx";
import Skeleton from "../loading/Skeleton.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import HomeSkeleton from "../loading/HomeSkeleton.jsx";

export default function Home() {
    const [headerMovie, setHeaderMovie] = useState({});
    const { getTrending, getDetails, isPending, error } = useFetch()
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const movies = await getTrending('movie');
            setMovieList(movies);
        }

        fetchData()
    },[])

    useEffect(() => {
        if (movieList?.length > 0) {
            const fetchHeaderMovie = async () => {
                const headerMovieDetails = await getDetails("movie", movieList[0]?.id);
                setHeaderMovie(headerMovieDetails);
            };
            fetchHeaderMovie();
        }
    }, [movieList]);

   

    return (
        <>
            {isPending ?  (<HomeSkeleton/>)
            :
            <>
            <HeaderSection movie={headerMovie} />
            <PopularSection
                movieList={movieList}
                errorMessage={error}
                isLoading={isPending}
                />
                </>
            }
                   
        </>
    );
}