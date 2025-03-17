import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";
import { imagePath, imagePathOriginal } from "../../api/movieService.js";
import { minutesTohours, ratingToPercentage, resolveRatingColor } from "../../utils/helper.js";
import { useAuth } from "../../context/AuthContext.jsx";
import useFirestore from "../../services/firestore.js";

export default function DetailsHeaderCard({ details, type }) {
    const { user } = useAuth()
    const {addToWatchList} = useFirestore()
    const title = details?.title || details?.name;
    const releaseDate =
        type === "tv" ? details?.first_air_date : details?.release_date;

    const addToWatchListHandler = async () => {
        const data = {
            id: details?.id,
            type: type,
            title: details?.title || details?.name,
            poster_path: details?.poster_path,
            release_date: details?.release_date || details?.first_air_date,
            original_language: details?.original_language,
            vote_average: details?.vote_average,
        }

        await addToWatchList(user?.uid, data?.id.toString(), data)

    }

    return (
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
                                {new Date(releaseDate).getFullYear() || 'N/A'}
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
                                    <div className="flex content-center items-center space-x-5">
                                        <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                                        <span className="text-sm">
                                            {minutesTohours(details?.runtime)}
                                        </span>
                                        {user &&
                                            <>
                                                <div>•</div>
                                                <button onClick={addToWatchListHandler} className="btn mt-auto bg-[#2c2c2c] hover:bg-[#4c4c4c]">Add to Watchlist</button>
                                            </>
                                        }

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
    );
}