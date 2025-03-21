import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../loading/Spinner.jsx";
import VideoGallery from "./Videos/VideoGalery.jsx";
import SmallHeroCard from "./SmallHeroCard.jsx";
import DetailsHeaderCard from "./DetailsHeaderCard.jsx";
import PersonHeaderCard from "./PersonHeaderCard.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import ReviewForm from "./reviews/ReviewForm.jsx";
import ReviewComponent from "./reviews/ReviewComponent.jsx";
import useFirestore from "../../services/firestore.js";
import CreateReview from "./reviews/CreateReview.jsx";

export default function Details() {
    const { type, id } = useParams();

    const {
        isPending,
        error,
        getDetails,
        getPersonImages,
        getPersonCredits,
        getVideos,
        getSimilar,
        getCredits,
    } = useFetch();

    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([]);
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [latestReview, setLatestReview] = useState(null);

    const { getLatestReview } = useFirestore();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        setVideo(null);
        const fetchData = async () => {
            try {
                const detailsData = await getDetails(type, id);
                setDetails(detailsData);
                console.log(detailsData)

                if (type === "person") {
                    const profilesData = await getPersonImages(type, id);
                    const credits = await getPersonCredits(type, id);

                    setCast(credits?.cast.slice(0, 20));
                    setProfiles(profilesData.profiles);
                }

                if (type !== "person") {
                    const [videosData, similarData, creditsData, reviewData] = await Promise.all([
                        getVideos(type, id),
                        getSimilar(type, id),
                        getCredits(type, id),
                        getLatestReview(id),
                    ]);

                    setSimilar(similarData);
                    setCast(creditsData?.cast?.slice(0, 10));
                    setLatestReview(reviewData);

                    const video = videosData?.find((video) => video?.type === "Trailer");
                    setVideo(video);

                    const videos = videosData?.filter((video) => video?.type !== "Trailer")?.slice(0, 10);
                    setVideos(videos);
                }
            } catch (error) {
                console.log(error, "error");
            }
        };

        fetchData();
    }, [type, id]);

    if (isPending) {
        return <Spinner />;
    }

    if (!type || !id) return <Spinner />;

    return (
        <div>
            {/* Header Section */}
            {type === "movie" || type === "tv" ? (
                <DetailsHeaderCard details={details} type={type} />
            ) : (
                <PersonHeaderCard details={details} profiles={profiles} />
            )}

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-10">
                {/* Cast Section */}
                <h2 className="text-md uppercase mt-10">
                    {type === "person" ? "Featured In" : "Cast"}
                </h2>
                <div className="flex mt-5 mb-10 overflow-x-auto pb-4">
                    <div className="flex gap-8 m-2">
                        {cast?.length === 0 && (
                            <p className="text-l text-gray-300 -m-2">
                                {type === "person" ? "No Movies" : "No cast found"}
                            </p>
                        )}
                        {cast?.map((person) => (
                            <div key={person?.id} className="min-w-[200px] max-w-[200px] flex-none">
                                <SmallHeroCard
                                    data={person}
                                    type={type === "person" ? person.media_type : "person"}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Similar Movies/TV Shows Section */}
                {type !== "person" && (
                    <>
                        <h2 className="text-md uppercase mt-10">
                            Similar {type === "tv" ? "TV Series" : "Movies"}
                        </h2>
                        <div className="flex mt-5 mb-10 overflow-x-auto pb-4">
                            <div className="flex gap-8 m-2">
                                {similar?.length === 0 && (
                                    <p className="text-l text-gray-300 -m-2">No Similar Movies found</p>
                                )}
                                {similar?.map((m) => (
                                    <div key={m?.id} className="min-w-[200px] max-w-[200px] flex-none">
                                        <SmallHeroCard data={m} type={type} />
                                    </div>
                                ))}
                            </div>
                        </div>


                        
                        {/* {isPending ? (
                            <Spinner />
                        ) : (
                            <VideoGallery video={video} videos={videos} />
                        )} */}

                        {/* Latest Review Section */}
                        <h2 className="text-md uppercase mt-10">
                            Latest Review <Link to="#">{">"}</Link>
                        </h2>
                        <div className="flex justify-center pb-5">
                            {latestReview ? (
                                <div className="max-w-2xl mx-auto">
                                    <ReviewComponent review={latestReview} />
                                </div>
                            ) : (
                                <p className="text-gray-300">No reviews yet.</p>
                            )}
                        </div>

                        {/* Review Form */}
                        <CreateReview movieDetails={details} setLatest={setLatestReview} />
                    </>
                )}
            </div>
        </div>
    );
}


{/* 
                        {isPending ? (
                            <Spinner />
                        ) : (
                            <VideoGallery video={video} videos={videos} />
                        )} */}