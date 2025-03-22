import { XMarkIcon } from "@heroicons/react/16/solid";

export default function SearchReview({ searchTerm, setSearchTerm, filter, setFilter, onSearch, onClear }) {

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSearch(searchTerm); 
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-200 mx-auto p-4">
            {/* Search Bar */}
            <label className="input input-bordered flex items-center gap-2 w-full bg-[#2c2c2c]">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    required
                    placeholder="Search by Title or Username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent outline-none ml-2 placeholder-gray-500"
                />
            </label>

            {/* Search Button */}
            <button
                type="submit" 
                className="btn flex items-center mt-auto bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded"
            >
                Search
            </button>

            {/* Filter Dropdown */}
            <select
                className="input bg-[#2c2c2c] max-w-40 rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:ring-gray-500 text-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="rating-asc">Sort by Lower Rating</option>
                <option value="rating-desc">Sort by Higher Rating</option>
            </select>

            <button type="button" className="btn flex items-center mt-auto bg-[#2c2c2c] hover:bg-[#4c4c4c] rounded" onClick={onClear}>
                <XMarkIcon className="h-6 w-6" />
            </button>
        </form>
    );
}