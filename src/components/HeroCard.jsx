import { MinusCircleIcon, StarIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

export default function HeroCard({ data, type, onRemove, isWatchlist, isUserReviews }) {
    const isPerson = type === "person";

    return (
        <div className="relative group transform transition-all duration-300 hover:scale-105 hover:shadow-[#a8b5db]/50 hover:z-10 ">
            {isWatchlist && (
                <div className="tooltip ml-13 tooltip-error" data-tip="Remove from Watchlist">
                    <button
                        onClick={() => onRemove(data.id)}
                        className="absolute top-2 right-0 z-10 p-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                    >
                        <MinusCircleIcon className="w-10 h-10 text-white" />
                    </button>
                </div>
            )}
   
            <Link
                to={`/${type}/${data?.id}`}
                className="bg-[#2c2c2c] p-6 rounded-3xl shadow-2xl shadow-[#a8b5db]/30 block transition-all duration-300  hover:shadow-[#a8b5db]/50 hover:z-10 h-full"
            >
                <img
                    src={data.poster_path || data.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${data.poster_path || data.profile_path}`
                        : "/no-poster.png"}
                    alt={data.title || data.name}
                    className={`
                        rounded-lg w-full max-w-full 
                        ${isUserReviews ? 'max-h-[400px]' : 'min-h-[300px] max-h-[400px]'} 
                        object-cover mx-auto
                      `}
                />
                <div className="mt-5">
                    <h3 className="text-white font-bold text-lg truncate">{data.title || data.name}</h3>

                    {!isPerson ? (
                        <div className="content mt-3 flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <p className="font-bold text-white text-sm">
                                    {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
                                </p>
                            </div>
                            <span className="text-sm text-[#a8b5db] self-center">•</span>
                            <p className="lang capitalize text-[#a8b5db] text-sm font-medium self-center">
                                {data.original_language}
                            </p>
                            <span className="text-sm text-[#a8b5db] self-center">•</span>
                            <p className="year text-[#a8b5db] text-sm font-medium self-center">
                                {data.release_date?.split("-")[0] || data.first_air_date?.split("-")[0] || "N/A"}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-[#a8b5db] font-medium mt-2">{data.known_for_department}</p>
                    )}
                </div>
            </Link>
        </div>
    );
}