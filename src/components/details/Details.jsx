import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchDetails, fetchCredits, fetchVideos, imagePath, imagePathOriginal, fetchSimilar, fetchImages, fetchPErsonCredits } from "../../api/movieService.js";
import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";
import { minutesTohours, ratingToPercentage, resolveRatingColor } from "../../utils/helper.js";
import Spinner from "../loading/Spinner.jsx";
import VideoGallery from "./Videos/VideoGalery.jsx";
import SmallHeroCard from "./SmallHeroCard.jsx";
import DetailsHeaderCard from "./DetailsHeaderCard.jsx";
import PersonHeaderCard from "./PersonHeaderCard.jsx";


export default function Details() {
    const { type, id } = useParams();

    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [similar, setSimilar] = useState([])
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        setVideo(null);
        setLoading(true)
        const fetchData = async () => {
            try {
                const detailsData = await fetchDetails(type, id)

                setDetails(detailsData);


                if (type === "person") {
                    const profilesData = await fetchImages(type, id)
                    const credits = await fetchPErsonCredits(type, id)
                    setCast(credits?.cast)
                    setProfiles(profilesData)
                }

                if (type !== "person") {
                    const [videosData, similarData, creditsData] = await Promise.all([
                        fetchVideos(type, id),
                        fetchSimilar(type, id),
                        fetchCredits(type, id),
                    ]);

                    setSimilar(similarData);
                    setCast(creditsData?.cast?.slice(0, 10));

                    const video = videosData?.results?.find((video) => video?.type === "Trailer");
                    setVideo(video);

                    const videos = videosData?.results?.filter((video) => video?.type !== "Trailer")?.slice(0, 10);
                    setVideos(videos);
                }
            } catch (error) {
                console.log(error, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [type, id]);


    if (loading) {
        return (
            <Spinner />
        );
    }

    if (!type || !id) return <Spinner />;


    return (
        <div>

            {type === "movie" || type === "tv" ? (
                <DetailsHeaderCard details={details} type={type} />
            ) : (
                <PersonHeaderCard details={details} profiles={profiles} />
            )}

            <div className="container mx-auto px-4 pb-10">
                <h2 className="text-md uppercase mt-10">{type === 'person' ? 'Featured In' : 'Cast'}</h2>
                <div className="flex mt-5 mb-10 overflow-x-auto pb-4">
                    <div className="flex gap-8 m-2">
                        {cast?.length === 0 && <p className="text-l text-gray-300 -m-2">{type === 'person' ? 'No Movies' : 'No cast found'}</p>}
                        {cast?.map((person) => (
                            <div key={person?.id} className="min-w-[200px] max-w-[200px] flex-none">
                                <SmallHeroCard
                                    data={person}
                                    type={type === 'person' ? person.media_type : 'person'}
                                    isPerson={type === 'person'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {type !== 'person' &&
                    <>
                        <h2 className="text-md uppercase mt-10">Similar {type === 'tv' ? 'TV Series' : 'Movies'}</h2>
                        <div className="flex mt-5 mb-10 overflow-x-auto pb-4">
                            <div className="flex gap-8 m-2">
                                {similar?.length === 0 && <p className="text-l text-gray-300 -m-2">No Similar Movies found</p>}
                                {similar?.map((m) => (
                                    <div key={m?.id} className="min-w-[200px] max-w-[200px] flex-none">
                                        <SmallHeroCard data={m} type={type} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <VideoGallery video={video} videos={videos} />
                    </>}

            </div>
        </div>
    );
};
