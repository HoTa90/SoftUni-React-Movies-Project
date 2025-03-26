import { useCallback, useEffect, useRef, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

export const useFetch = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const abortControllers = useRef(new Set());
    const ongoingFetches = useRef(0)

    const fetchData = useCallback(async (url) => {
        const abortController = new AbortController();
        abortControllers.current.add(abortController);
        ongoingFetches.current += 1
        setIsPending(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}${url}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                signal: abortController.signal,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                if (res.status === 404 || errorData.status_code === 34) {
                    throw new Error('NOT_FOUND');
                }
                throw new Error(errorData.status_message || `Request failed: ${res.status}`);
            }

            const result = await res.json();
            return result.results || result;
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message);
                throw err
            }

            if (err.name === "AbortError") {
                console.log("Fetch aborted:", url);
                return;
            }


        } finally {
            ongoingFetches.current -= 1;
            if (ongoingFetches.current === 0) {

                setIsPending(false);
            }
            abortControllers.current.delete(abortController);
        }
    }, []);

    useEffect(() => {
        return () => {
            abortControllers.current.forEach(controller => controller.abort());
            abortControllers.current.clear();
        };
    }, []);

    const getTrending = useCallback(
        (type) => fetchData(`/trending/${type}/day?language=en-US`),
        [fetchData]);

    const getDetails = useCallback(
        (type, id) => fetchData(`/${type}/${id}`),
        [fetchData]);

    const getMoviesByGenre = useCallback(async (genreId, page = 1) =>
        fetchData(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`),
        [fetchData]);

    const getTVByGenre = useCallback(async (genreId, page = 1) =>
        fetchData(`/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`),
        [fetchData]);

    const getCredits = useCallback(
        (type, id) => fetchData(`/${type}/${id}/credits`),
        [fetchData]
    );

    const getPersonCredits = useCallback(async (type, id) => fetchData(`/${type}/${id}/combined_credits?language=en-US`),
        [fetchData]);

    const getPersonImages = useCallback(async (type, id) => fetchData(`/${type}/${id}/images`),
        [fetchData]);

    const getVideos = useCallback(async (type, id) => fetchData(`/${type}/${id}/videos?language=en-US`),
        [fetchData]);

    const getMovies = useCallback(async (page = 1, sortBy = "desc") =>
        fetchData(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}`),
        [fetchData]);

    const getSeries = useCallback(async (page = 1, sortBy = "desc") =>
        fetchData(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.${sortBy}`),
        [fetchData]);

    const getSimilar = useCallback(async (type, id) =>
        fetchData(`/${type}/${id}/similar?language=en-US&page=1`),
        [fetchData]);

    const searchMovie = useCallback(async (query, page = 1) =>
        fetchData(`/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`),
        [fetchData]);

    const searchTV = useCallback(async (query, page = 1) =>
        fetchData(`/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`), [fetchData]);

    return {
        isPending,
        error,
        getTrending,
        getDetails,
        getMoviesByGenre,
        getTVByGenre,
        getCredits,
        getPersonCredits,
        getPersonImages,
        getVideos,
        getMovies,
        searchMovie,
        searchTV,
        getSeries,
        getSimilar
    };
};