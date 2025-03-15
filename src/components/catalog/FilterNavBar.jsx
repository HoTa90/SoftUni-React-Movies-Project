export default function FilterNavBar({ onGenreSelect, isMovie }) {
    const genresMovies = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
        { id: false, name: "Remove Filter" }
    ];

    const genresTV = [
        { id: 10759, name: "Action & Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 10762, name: "Kids" },
        { id: 9648, name: "Mystery" },
        { id: 10763, name: "News" },
        { id: 10764, name: "Reality" },
        { id: 10765, name: "Sci-Fi & Fantasy" },
        { id: 10766, name: "Soap" },
        { id: 10767, name: "Talk" },
        { id: 10768, name: "War & Politics" },
        { id: 37, name: "Western" },
        { id: false, name: "Remove Filter" }
    ];
    
    const genres = isMovie ? genresMovies : genresTV;
    console.log(genres)

    return (
        <aside className="min-w-[64] text-gray-300 left-0 top-0 sticky mt-33 mb-27 flex flex-col py-6 px-4">
            <h2 className="text-xl font-bold mb-9 text-center top-0 ">Filter by Genre</h2>
            <nav className="space-y-2 ">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => onGenreSelect(genre.id)}
                        className="w-full text-left px-4 py-1.5 m-1.5 rounded-lg transition-all hover:bg-gray-700"
                    >
                        {genre.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
