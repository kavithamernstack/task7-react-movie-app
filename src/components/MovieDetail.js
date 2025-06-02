// components/MovieDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetails } from '../api'; // Assuming the function is named fetchMovieDetails

function MovieDetail({ favourites = [], onAddFavourite }) {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetched movie:", movie);
    }, [movie]);


    useEffect(() => {
        const MovieDetail = async () => {
            try {
                // setLoading(true);
                const data = await MovieDetails(id);
                console.log("Movie Details API Response:", data);
                setMovie(data)
            } catch (error) {
                setError("failed to fetch the movies")
            }
        }
        MovieDetail();
    }, [id])

    if (!movie) {
        return (
            <h1 className="text-center mt-10 text-xl text-gray-600">Movie not found.</h1>
        );
    }

    if (error) {
        return (
            <h1 className="text-center mt-10 text-red-600 font-semibold text-xl">
                {error}
            </h1>
        );
    }

    if (!movie) {
        return null;
    }

    // Check if movie already in favourites
    const isFavourite = favourites.some((fav) => fav.imdbID === movie.imdbID);

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg text-gray-900">
            <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full md:w-72 rounded-lg object-cover shadow-md"
            />
            <div className="flex flex-col flex-grow">
                <h1 className="text-3xl font-bold mb-3">{movie.Title}</h1>
                <p className="mb-2"><strong>Writer:</strong> {movie.Writer}</p>
                <p className="mb-2"><strong>Year:</strong> {movie.Year}</p>
                <p className="mb-2"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                <p className="mb-4"><strong>Genre:</strong> {movie.Genre}</p>
                 <p className="mb-4"><strong>Cast:</strong> {movie.Language}</p>
                <p className="mb-6"><strong>Plot:</strong> {movie.Plot}</p>

                <button
                    onClick={() => onAddFavourite(movie)}
                    disabled={isFavourite}
                    className={`mt-4 w-fit flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition duration-300
                    ${isFavourite ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                >
                    <i className="fa-solid fa-heart"></i>
                    {isFavourite ? "Already in Favourites" : "Add to Favourites"}
                </button>
            </div>
        </div>
    );
}

export default MovieDetail;
