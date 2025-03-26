import HeroCard from "../HeroCard.jsx";
import Spinner from "../loading/Spinner.jsx";


export default function PopularSection({
    trendingMovies,
    trendingTV,
    trendingPeople,
    errorMessage,
    isLoading
}) {

    return (
        <section className="px-28 py-15">
            {/* Popular Movies Section */}
            <h2 className="text-white text-2xl font-bold mb-8">Popular Movies</h2>
            {isLoading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                        {trendingMovies && trendingMovies.slice(0, 5).map(movie => (
                            <li key={movie.id} className="p-0">
                                <HeroCard data={movie} type='movie' />
                            </li>
                        ))}
                    </ul>
                    {/* TV Section */}
                    <h2 className="text-white text-2xl font-bold mb-8">TV</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                        {trendingTV && trendingTV.slice(0, 5).map(tv => (
                            <li key={tv.id} className="p-0">
                                <HeroCard data={tv} type='tv' />
                            </li>
                        ))}
                    </ul>

                    {/* People Section */}
                    <h2 className="text-white text-2xl font-bold mb-8">People</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {trendingPeople && trendingPeople?.slice(0, 5).map(p => (
                            <li key={p.id} className="p-0">
                                <HeroCard data={p} type='person' />
                            </li>
                        ))}
                    </ul>
                </>
            )}


        </section>
    );
}