import { CalendarIcon } from "@heroicons/react/16/solid";
import { imagePath, imagePathOriginal, ratingToPercentage, resolveRatingColor } from "../../utils/helper.js";

export default function PersonHeaderCard({ details, profiles }) {
    const profileImage = profiles[0]?.file_path;


    return (
        <div
            className="w-full h-auto md:h-[500px] py-2 flex items-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${profileImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <img
                        className="h-[450px] rounded-sm shadow-lg shadow-gray-500/50"
                        src={profileImage ? `${imagePath}/${profileImage}` : '/no-poster.png'}
                        alt={details?.name}
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">
                            {details?.name}
                        </h1>

                        <div className="flex items-center gap-4 mt-1 mb-5">
                            <div className="flex items-center">
                                <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                                <span className="text-sm">
                                    Born: {new Date(details?.birthday).toLocaleDateString("en-US") || 'N/A'}
                                </span>
                            </div>
                            {details?.deathday && (
                                <>
                                    <div>•</div>
                                    <div className="flex items-center">
                                        <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                                        <span className="text-sm">
                                            Died: {new Date(details?.deathday).toLocaleDateString("en-US")}
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
                                        details?.popularity
                                    )} ${ratingToPercentage(details?.popularity)}%, transparent 0)`,
                                }}
                            >
                                <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-900">
                                    <span className="text-lg">
                                        {ratingToPercentage(details?.popularity)}{" "}
                                        <span className="text-[10px]">%</span>
                                    </span>
                                </div>
                            </div>
                            <span className="hidden md:inline">Popularity Rating</span>
                        </div>
                        <p className="text-gray-400 text-sm italic my-5"><span className="font-bold">Place of Birth:</span> {details?.place_of_birth || 'Unknown'}</p>
                        <p className="text-gray-400 text-sm italic my-5"><span className="font-bold">Known For:</span> {details?.known_for_department}</p>
                        <h2 className="text-xl font-bold mb-3">Biography</h2>
                        <div className="overflow-y-auto max-h-[200px] pr-4">
                            <p className="text-md mb-3">{details?.biography || 'No available information.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}