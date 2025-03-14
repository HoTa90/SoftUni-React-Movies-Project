import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchDetails, fetchCredits, fetchVideos, imagePath, imagePathOriginal, fetchSimilar } from "../../api/movieService.js";
import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";
import { minutesTohours, ratingToPercentage, resolveRatingColor } from "../../utils/helper.js";
import Spinner from "../loading/Spinner.jsx";
import VideoGallery from "./Videos/VideoGalery.jsx";
import SmallHeroCard from "./SmallHeroCard.jsx";


export default function Details() {
    const { type, id } = useParams();

    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [similar, setSimilar] = useState([])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        setVideo(null);
        setLoading(true)
        const fetchData = async () => {
            try {
                const [detailsData, creditsData, videosData, similarData] = await Promise.all([
                    fetchDetails(type, id),
                    fetchCredits(type, id),
                    fetchVideos(type, id),
                    fetchSimilar(type, id)
                ]);

                setDetails(detailsData);
                setSimilar(similarData)
                setCast(creditsData?.cast?.slice(0, 10));
                const video = videosData?.results?.find(
                    (video) => video?.type === "Trailer"
                );
                setVideo(video);
                const videos = videosData?.results
                    ?.filter((video) => video?.type !== "Trailer")
                    ?.slice(0, 10);
                setVideos(videos);
            } catch (error) {
                console.log(error, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [type, id]);

    console.log(similar)

    if (loading) {
        return (
            <Spinner />
        );


    }

    const title = details?.title || details?.name;
    const releaseDate =
        type === "tv" ? details?.first_air_date : details?.release_date;

    return (
        <div>
            <div
                className="w-full h-auto md:h-[500px] py-2 flex items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <img
                            className="h-[450px] rounded-sm"
                            src={`${imagePath}/${details?.poster_path}`}
                            alt={title}
                        />
                        <div>
                            <h1 className="text-3xl font-bold">
                                {title}{" "}
                                <span className="font-normal text-gray-400">
                                    {new Date(releaseDate).getFullYear()}
                                </span>
                            </h1>

                            <div className="flex items-center gap-4 mt-1 mb-5">
                                <div className="flex items-center">
                                    <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                                    <span className="text-sm">
                                        {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                                    </span>
                                </div>
                                {type === "movie" && (
                                    <>
                                        <div>•</div>
                                        <div className="flex items-center">
                                            <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                                            <span className="text-sm">
                                                {minutesTohours(details?.runtime)}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-[70px] h-[70px] rounded-full bg-gray-800 p-1"
                                    style={{
                                        background: `conic-gradient(${resolveRatingColor(
                                            details?.vote_average
                                        )} ${ratingToPercentage(details?.vote_average)}%, transparent 0)`,
                                    }}
                                >
                                    <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-900">
                                        <span className="text-lg">
                                            {ratingToPercentage(details?.vote_average)}{" "}
                                            <span className="text-[10px]">%</span>
                                        </span>
                                    </div>
                                </div>
                                <span className="hidden md:inline">User Score</span>
                            </div>
                            <p className="text-gray-400 text-sm italic my-5">{details?.tagline}</p>
                            <h2 className="text-xl font-bold mb-3">Overview</h2>
                            <p className="text-md mb-3">{details?.overview}</p>
                            <div className="flex gap-2 mt-6">
                                {details?.genres?.map((genre) => (
                                    <span
                                        key={genre?.id}
                                        className="px-2 py-1 bg-[#2c2c2c] rounded text-sm"
                                    >
                                        {genre?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-10">
                <h2 className="text-md uppercase mt-10">Cast</h2>
                <div className="flex mt-5 mb-10 overflow-x-scroll gap-8">
                    {cast?.length === 0 && <p>No cast found</p>}
                    {cast?.map((item) => (
                        <div key={item?.id} className="min-w-[200px] bg-[#2c2c2c] p-5 rounded shadow-2xl shadow-[#a8b5db]/30 relative block transform transition-all duration-300 hover:scale-112 hover:shadow-[#a8b5db]/50 hover:z-10">
                            <img
                                src={`${imagePath}/${item?.profile_path}`}
                                alt={item?.name}
                                className="w-full h-[225px] rounded-sm"
                            />
                            <div className="grid-cols-2 mt-5 ">
                                <p className="text-gray-400 text-sm italic mt-3 mb-1">{item?.character}</p>
                                <p className="text-white text-sm bold mb-2">{item?.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-md uppercase mt-10">Similar Movies</h2>
                <div className="flex mt-5 mb-10 overflow-x-auto pb-4">
                    <div className="flex gap-4">
                        {similar?.length === 0 && <p>No Similar Movies found</p>}
                        {similar?.map((m) => (
                            <div key={m?.id} className="min-w-[200px] max-w-[200px] flex-none">
                                <SmallHeroCard data={m} type={type} />
                            </div>
                        ))}
                    </div>
                </div>

                <VideoGallery video={video} videos={videos} />
            </div>
        </div>
    );
};
