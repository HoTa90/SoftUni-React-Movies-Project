
export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";


const API_KEY ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDc5M2VmOGYwNTRlZmMwZjZhN2RmMWVhN2IxZjM3MyIsIm5iZiI6MTc0MDc0MjYwMi4wMDgsInN1YiI6IjY3YzE5ZmNhYjYwYmI5ODM5NzM1YjE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZeagTbUtOlAcWwUeXRbvAH3TwzbMp_I8jQvEqMsUU5I";
const API_BASE_URL = "https://api.themoviedb.org/3";


const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};


// Helper function to handle fetch requests
const fetchData = async (url) => {
    try {
        const response = await fetch(url, API_OPTIONS);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

// TRENDING
export const fetchTrending = async (type) => {
    const url = `${API_BASE_URL}/trending/${type}/day?language=en-US}`;
    const data = await fetchData(url);
    return await data?.results;
};

// MOVIES & SERIES - Details
export const fetchDetails = async (type, id) => {
    const url = `${API_BASE_URL}/${type}/${id}`;
    return await fetchData(url);
};

// MOVIES & SERIES - Credits
export const fetchCredits = async (type, id) => {
    const url = `${API_BASE_URL}/${type}/${id}/credits?language=en-US`;
    return await fetchData(url);
};

// MOVIES & SERIES - Videos
export const fetchVideos = async (type, id) => {
    const url = `${API_BASE_URL}/${type}/${id}/videos?language=en-US`;
    return await fetchData(url);
};

// DISCOVER - Movies
export const fetchMovies = async (page, sortBy) => {
    const url = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}`;
    return await fetchData(url);
};
export const fetchAllMovies = async () => {
    const url = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const data = await fetchData(url)
    return data.results;
}

// DISCOVER - TV Series
export const fetchTvSeries = async (page, sortBy) => {
    const url = `${API_BASE_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortBy}`;
    return await fetchData(url);
};

// SEARCH
export const searchData = async (query, page) => {
    const url = `${API_BASE_URL}/search/multi?&query=${query}&include_adult=false&language=en-US&page=${page}`;
    return await fetchData(url);
};