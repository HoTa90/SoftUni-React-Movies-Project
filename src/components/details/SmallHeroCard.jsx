import { Link } from "react-router";
import { StarIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";

export default function SmallHeroCard({ data, type }) {
   
   
     useEffect(() => {
           window.scroll(0, 0)
       }, [])
   
    return (
        <Link
            to={`/${type}/${data?.id}`}
            className="bg-[#2c2c2c] p-3 rounded-xl shadow-lg shadow-[#a8b5db]/30 relative transform transition-all duration-300 hover:scale-105 hover:shadow-[#a8b5db]/50 hover:z-10 min-w-[150px] flex flex-col"
        >
            {/* Image Section */}
            <div className="flex-none">
                <img 
                    src={data.poster_path 
                        ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` 
                        : '/no-poster.png'} 
                    alt={data.title || data.name} 
                    className="rounded-lg w-full h-[180px] object-cover aspect-[2/3]"
                />
            </div>

            {/* Content Section */}
            <div className="mt-2 flex flex-col flex-1">
                {/* Title with fixed height */}
                <div className="min-h-[40px] flex items-center">
                    <h3 className="text-white font-bold text-base truncate">
                        {data.title || data.name}
                    </h3>
                </div>

                {/* Details with proper alignment */}
                <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                    <div className="flex items-baseline gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 relative top-0.5" />
                        <p className="font-bold text-white text-xs">
                            {data.vote_average ? data.vote_average.toFixed(1) : 'N/A'}
                        </p>
                    </div>
                    <span className="text-xs text-[#a8b5db] relative top-0.5">•</span>
                    <p className="lang capitalize text-[#a8b5db] text-xs font-medium">
                        {data.original_language}
                    </p>
                    <span className="text-xs text-[#a8b5db] relative top-0.5">•</span>
                    <p className="year text-[#a8b5db] text-xs font-medium">
                        {data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0] || 'N/A'}
                    </p>
                </div>
            </div>
        </Link>
    );
}