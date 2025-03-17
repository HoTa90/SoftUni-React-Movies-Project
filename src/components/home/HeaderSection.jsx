import { Link } from "react-router";
import { minutesTohours } from "../../utils/helper.js";

export default function HeaderSection({ movie }) {



   return (
      <div className="relative min-h-[500px] w-full bg-cover bg-center shadow-2xl shadow-[#a8b5db]/30"
         style={{
            backgroundImage: movie?.backdrop_path
               ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
               : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}
      >

         <div className="absolute inset-0 bg-black/50 shadow-lg"></div>


         <div className="relative w-full px-30 flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 space-y-6 lg:space-y-0 lg:space-x-12">

            <div className="max-w-xl text-white z-10">
               <h1 className="mt-4 text-5xl font-extrabold text-balance">{movie?.title}</h1>
               <p className="mt-2">{movie?.release_date ? movie?.release_date.split('-')[0] : 'N/A'} • {minutesTohours(movie?.runtime)}</p>
               <p className="mt-2 text-lg">{movie?.overview}</p>
               <Link to={`/movie/${movie?.id}`} className="btn mt-4 bg-[#2c2c2c] hover:bg-[#4c4c4c]">More Details</Link>
            </div>

            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end p-4 z-10">
               <img
                  src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}` : '/no-poster.png'}
                  alt={movie?.title}
                  className="h-auto max-w-full object-cover rounded-lg shadow-2xl shadow-[#a8b5db]/30"
               />
            </div>
         </div>
      </div>
   );
}
