import HeroCard from "../HeroCard.jsx";
import Spinner from "../Spinner.jsx";

export default function PopularSection({ movieList, errorMessage, isLoading, people, series }) {
    return (
        <section className="px-4 py-10">
            {/* Popular Movies Section */}
            <h2 className="text-white text-2xl font-bold mb-8 ">Popular Movies</h2>
            {isLoading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                    {movieList && movieList.slice(0, 5).map(movie => (
                        <li key={movie.id} className="p-2">
                            <HeroCard data={movie} type='movie' />
                        </li>
                    ))}
                </ul>
            )}

            {/* TV Section */}
            <h2 className="text-white text-2xl font-bold mb-8 ml-auto">TV</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                {series && series.slice(0, 5).map(tv => (
                    <li key={tv.id} className="p-2">
                        <HeroCard data={tv} type='tv' />
                    </li>
                ))}
            </ul>

            {/* People Section */}
            <h2 className="text-white text-2xl font-bold mb-8">People</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {people && people.slice(0, 5).map(p => (
                    <li key={p.id} className="p-2">
                        <HeroCard data={p}  type='person' />
                    </li>
                ))}
            </ul>
        </section>
    );
}