export default function WatchList() {
    return (
        <section className="px-28 py-15">

            <h2 className="text-white text-2xl font-bold mb-8">My Watchlist</h2>
            {/* <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                {watchlist && watchlist.map(movie => (
                    <li key={movie.id} className="p-0">
                        <HeroCard data={movie} type='movie' />
                    </li>
                ))}
            </ul> */}
        </section>
    );
}