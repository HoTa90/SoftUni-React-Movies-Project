import { useEffect, useRef, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

export const useFetch = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const abortControllers = useRef(new Set());
    const ongoingFetches = useRef(0)

    const fetchData = async (url) => {
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
        } finally {
            ongoingFetches.current -= 1;
            if (ongoingFetches.current === 0) {

                setIsPending(false);
            }
            abortControllers.current.delete(abortController);
        }
    };

    useEffect(() => {
        return () => {
            abortControllers.current.forEach(controller => controller.abort());
            abortControllers.current.clear();
        };
    }, []);

    const getTrending = async (type) => fetchData(`/trending/${type}/day?language=en-US`);

    const getDetails = async (type, id) => fetchData(`/${type}/${id}`);

    const getMoviesByGenre = async (genreId, page = 1) =>
        fetchData(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`);

    const getTVByGenre = async (genreId, page = 1) =>
        fetchData(`/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`);

    const getCredits = async (type, id) => fetchData(`/${type}/${id}/credits?language=en-US`);

    const getPersonCredits = async (type, id) => fetchData(`/${type}/${id}/combined_credits?language=en-US`);

    const getPersonImages = async (type, id) => fetchData(`/${type}/${id}/images`);

    const getVideos = async (type, id) => fetchData(`/${type}/${id}/videos?language=en-US`);

    const getMovies = async (page = 1, sortBy = "desc") =>
        fetchData(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}`);

    const getSeries = async (page = 1, sortBy = "desc") =>
        fetchData(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.${sortBy}`);

    const getSimilar = async (type, id) =>
        fetchData(`/${type}/${id}/similar?language=en-US&page=1`);

    const searchMovie = async (query, page = 1) =>
        fetchData(`/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`);

    const searchTV = async (query, page = 1) =>
        fetchData(`/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`);

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