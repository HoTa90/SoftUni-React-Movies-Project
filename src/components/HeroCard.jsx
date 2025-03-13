import { Link } from "react-router";

export default function HeroCard({ data, type }) {
    const isPerson = type === "person";

    return (
        <Link
            to={`/${type}/${data?.id}`}
            className="bg-[#1b1a25] p-6 rounded-3xl shadow-2xl shadow-[#a8b5db]/30 relative block transform transition-all duration-300 hover:scale-112 hover:shadow-[#a8b5db]/50 hover:z-10"
        >
            <img 
                src={data.poster_path || data.profile_path 
                    ? `https://image.tmdb.org/t/p/w500/${data.poster_path || data.profile_path}` 
                    : '/no-poster.png'} 
                alt={data.title || data.name} 
                className="rounded-lg w-full max-w-auto h-auto object-cover mx-auto"
            />
            <div className="mt-5">
                <h3 className="text-white font-bold text-lg truncate">{data.title || data.name}</h3>
                
                {!isPerson ? (
                    <div className="content mt-3 flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <img src="Rating.svg" alt="Star Icon" className="w-5 h-5 object-contain mb-auto" />
                            <p className="font-bold text-white text-sm">
                                {data.vote_average ? data.vote_average.toFixed(1) : 'N/A'}
                            </p>
                        </div>
                        <span className="text-xs text-[#a8b5db] mb-auto">•</span>
                        <p className="lang capitalize text-[#a8b5db] text-sm font-medium">{data.original_language}</p>
                        <span className="text-xs text-[#a8b5db] mb-auto">•</span>
                        <p className="year text-[#a8b5db] text-sm font-medium">
                            {data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0] || 'N/A'}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-[#a8b5db] font-medium mt-2">{data.known_for_department}</p>
                )}
            </div>
        </Link>
    );
}