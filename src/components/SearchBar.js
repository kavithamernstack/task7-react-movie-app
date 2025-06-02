import { useState } from "react"

function SearchBar({ onSearch }) {
    // creating the state variables
    const [searchTerm, setSearchTerm] = useState('');

    // handle the search feilds
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSearch} className="flex justify-center mb-6">
            <div className="relative w-2/3 max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fa-solid fa-magnifying-glass text-black"></i>
                </span>
                <input
                    type="text"
                    placeholder="Search your movie.."
                    className="pl-10 pr-4 py-2 w-full bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-indigo-600 shadow"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBar