import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import Spinner from "../loading/Spinner.jsx";
import VideoGallery from "./Videos/VideoGalery.jsx";
import SmallHeroCard from "./SmallHeroCard.jsx";
import DetailsHeaderCard from "./DetailsHeaderCard.jsx";
import PersonHeaderCard from "./PersonHeaderCard.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import ReviewComponent from "./reviews/ReviewComponent.jsx";
import useFirestore from "../../services/firestore.js";
import CreateReview from "./reviews/CreateReview.jsx";
import Skeleton from "../loading/Skeleton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { isValidType } from "../../utils/helper.js";

export default function Details() {
    const { type, id } = useParams();
    const { user } = useAuth()
    const navigate = useNavigate()

    const {
        isPending,
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
    const [detailsLoading, setDetailsLoading] = useState(true)

    const { getLatestReview, dbLoading, addReview, deleteReview } = useFirestore();


    useEffect(() => {
        setVideo(null);
        setDetailsLoading(true)
        const fetchData = async () => {
            try {
                const detailsData = await getDetails(type, id);
                setDetails(detailsData);

                if (type === "person") {
                    const profilesData = await getPersonImages(type, id);
                    const credits = await getPersonCredits(type, id);

                    setCast(credits?.cast.slice(0, 20));
                    setProfiles(profilesData.profiles);
                }

                if (type === "movie" || type === 'tv') {
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
                if (error.message === 'NOT_FOUND') {
                    navigate('/404', { replace: true });
                }
            } finally {
                setDetailsLoading(false)
            }
        };

        fetchData();
    }, [type, id, navigate, getCredits, getPersonCredits, getSimilar, getVideos, getDetails, getPersonImages, getLatestReview]);

    const deleteReviewHandler = async (reviewID) => {
        await deleteReview(reviewID)
        const newestReview = await getLatestReview(id)
        setLatestReview(newestReview)

    }

    if (!isValidType(type)) {
        return <Navigate to={'/404'} replace />
    }


    if (isPending || detailsLoading) {
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
                                    <p className="text-l text-gray-300 -m-2">No Similar {type === "tv" ? "TV Series" : "Movies"} found</p>
                                )}
                                {similar?.map((m) => (
                                    <div key={m?.id} className="min-w-[200px] max-w-[200px] flex-none">
                                        <SmallHeroCard data={m} type={type} />
                                    </div>
                                ))}
                            </div>
                        </div>



                        <VideoGallery video={video} videos={videos} loading={isPending} />


                        {/* Latest Review Section */}
                        <h2 className="text-md uppercase mt-9 text-start">
                            Latest Review{" "}
                            <div className="tooltip tooltip-warning normal-case" data-tip={`Go to all ${details?.name || details?.title} Reviews`}>
                                <Link className="hover:text-gray-400 transition text-4xl" to="reviews">
                                    {">"}
                                </Link>
                            </div>
                        </h2>
                        <div className="pb-5">
                            {dbLoading ? (
                                <div className="flex justify-center">
                                    <Skeleton small={true} />
                                </div>
                            ) : latestReview ? (
                                <div className="max-w-2xl mx-auto">
                                    <ReviewComponent review={latestReview} onDelete={deleteReviewHandler} />
                                </div>
                            ) : (
                                <p className="text-gray-300 text-start">No reviews yet.</p>
                            )}
                        </div>

                        {/* Review Form */}
                        {user && <CreateReview movieDetails={details} setLatest={setLatestReview} onCreate={addReview} />}

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