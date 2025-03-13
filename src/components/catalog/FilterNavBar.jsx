export default function FilterNavBar({ onGenreSelect }) {
    const genres = [
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
        { id: 37, name: "Western" }
    ];

    return (
        <aside className="w-64 h-screen text-white  left-0 top-0 flex flex-col py-6 px-4">
            <h2 className="text-xl font-bold mb-6 text-center">Filter by Genre</h2>
            <nav className="space-y-2">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => onGenreSelect(genre.id)}
                        className="w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-gray-700"
                    >
                        {genre.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
