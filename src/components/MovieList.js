import React from 'react';
import { Link } from 'react-router-dom';

function MovieList({ movies, favourites = [], onAddFavourite }) {
    // If movie is not found
    if (movies.length === 0) {
        return (
            <h1 className="text-center font-bold text-black uppercase text-2xl mt-10">
                No movies found. Please try a different search.
            </h1>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-8 py-10 px-4">
            {movies.map((movie) => (
                <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="transition-transform duration-300 ease-in-out transform hover:scale-95">
                    <div className="w-72 bg-white shadow-lg rounded-2xl overflow-hidden">
                        <img
                            src={movie.Poster} alt={movie.Title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4">
                            <h1 className="text-lg font-bold truncate">{movie.Title}</h1>
                            <div className="flex justify-between text-sm mt-2">
                                <span className="bg-white text-indigo-700 px-2 py-0.5 rounded-full font-medium">{movie.Year}</span>
                                <span className="italic capitalize">{movie.Type}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent Link navigation
                                onAddFavourite(movie);
                            }}
                            disabled={favourites.some((fav) => fav.imdbID === movie.imdbID)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-b-2xl text-white font-semibold transition duration-300
                             ${favourites.some((fav) => fav.imdbID === movie.imdbID)
                                    ? "bg-gray-400 cursor-not-sallowed"
                                    : "bg-pink-600 hover:bg-pink-700"}`}
                            title={
                                favourites.some((fav) => fav.imdbID === movie.imdbID)
                                    ? "Already in Favourites"
                                    : "Add to Favourites"
                            }
                        >
                            <i className="fa-solid fa-heart"></i>
                            <span className="hidden sm:inline">Favourite</span>
                        </button>

                    </div>
                </Link>
            ))}


        </div>
    );
}

export default MovieList;