import React from 'react';
import { Link } from 'react-router-dom';

function MovieList({ movies, favourites = [], onAddFavourite, currentPage, totalPages, onPageChange }) {
    // If movie is not found
    if (!movies || movies.length === 0) {
        return (
            <h1 className="text-center text-white mt-10 text-xl">
                No movies found. Please try a different search.
            </h1>
        );
    }

    const renderPagination = () => {
        const pagesToShow = 3;
        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="flex justify-center items-center flex-wrap gap-2 mt-12">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white text-indigo-600 rounded hover:bg-indigo-100 disabled:opacity-50"
                >
                    Prev
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${currentPage === page
                            ? "bg-white text-indigo-600 font-bold scale-105"
                            : "bg-white bg-opacity-20 text-black hover:bg-black hover:text-white"}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white text-indigo-600 rounded hover:bg-indigo-100 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
         <div className="mt-6 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1w sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
            {movies.map((movie) => {
                const isFavourite = favourites.some((fav) => fav.imdbID === movie.imdbID);

                return (
                    <div
                        key={movie.imdbID}
                        className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-95"
                    >
                        <Link to={`/movie/${movie.imdbID}`} className="block">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                                alt={movie.Title}
                                className="w-full h-96 object-cover"
                            />
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4">
                                <h1 className="text-lg font-bold truncate">{movie.Title}</h1>
                                <div className="flex justify-between text-sm mt-2">
                                    <span className="bg-white text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                                        {movie.Year}
                                    </span>
                                    <span className="italic capitalize">{movie.Type}</span>
                                </div>
                            </div>
                        </Link>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                onAddFavourite(movie);
                            }}
                            disabled={isFavourite}
                            title={isFavourite ? "Already in Favourites" : "Add to Favourites"}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-b-l text-white font-semibold transition duration-300
                            ${isFavourite ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"}`}
                        >
                            <i className={`fa-solid fa-heart ${isFavourite ? "text-white/70" : "text-white"}`}></i>
                            <span className="hidden sm:inline">Favourite</span>
                        </button>
                    </div>
                );
            })}
        </div>
         {renderPagination()}
        </div>
    );
}


export default MovieList;