// Favourite.js
import React from 'react';
import { Link } from 'react-router-dom';

function Favourite({ favourites, onRemoveFavourite }) {
  if (!Array.isArray(favourites) || favourites.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="text-center mt-6">
        <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Search
          </button>
        </Link>
      </div>
      <h2 className="text-2xl text-white font-semibold mb-4">Favourites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {favourites.map((movie) => (
          <div key={movie.imdbID} className="bg-white  bg-opacity-10 p-4 rounded shadow">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              className="w-full h-60 object-cover rounded mb-2"
            />
            <h3 className="text-lg text-black font-bold">{movie.Title}</h3>
            <button
              onClick={() => onRemoveFavourite(movie.imdbID)}
              className="mt-2 p-2 rounded-sm text-sm text-white hover:text-red-600 bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourite;
