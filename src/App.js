import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropDown";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Favourite from "./components/Favourite";
import { SearchMovie } from "./api";

function App() {

  // create the state variables
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [favourites, setFavourite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const moviesPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("movies");

  // create handlesearch funciton
  const handleSearch = useCallback(async (term = searchTerm, page = currentPage) => {
    try {
      setLoading(true)
      const data = await SearchMovie(term, filter, page);
      if (data.Response === "True") {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error);
      }
      // console.log("API Response:", data);  
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [filter, searchTerm, currentPage]);

  useEffect(() => {
    handleSearch(searchTerm, currentPage);
  }, [handleSearch, searchTerm, currentPage, filter])

  // fliter funciton 
  const handleFilterChange = (filter) => {
    setFilter(filter);
    setCurrentPage(1);
  }

  // add to favourite
  const addtoFavourite = (movie) => {
    if (favourites.find((fav) => fav.imdbID === movie.imdbID)) {
      alert("Movie is already to the favourite");
      return
    } else {
      setFavourite([...favourites, movie])
    }

  }

  // remove favourite
  const removeFromFavourite = (movieimdbID) => {
    setFavourite(favourites.filter((fav) => fav.imdbID !== movieimdbID));
  }

  // Pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalResults / moviesPerPage);
  // const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  // condition if data is loading
  if (loading) {
    return <h1 className="text-2xl text-center p-10 m-10 font-bold text-black-600">Data is loading..Please Wait a minute..</h1>
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-600 to-indigo-400 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-4xl font-bold text-center mb-6 text-white tracking-wider drop-shadow-lg mt-3">
            <span className="m-2 shadow-2xl bg-white text-black rounded-xl">
              <i class="fa-solid fa-video p-2"></i>
            </span>
            CiniFlex
          </header>
          <Routes>
            <Route path="/" element={
              <>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-4 px-4">
                  <div className="w-full sm:w-auto">
                    <SearchBar onSearch={(term) => { setSearchTerm(term); setCurrentPage(1); handleSearch(term, 1); }} />
                  </div>

                  <div className="fw-full sm:w-auto">
                    <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
                  </div>

                  <div className="w-full sm:w-auto md:mt-[6px]">
                    <Link to="/favourite">
                      <button className="flex items-center justify-center  px-5 py-2.5 md: pt-2.5 pb-2.5 mb-10 mt-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 w-full sm:w-auto">
                        Favourite
                      </button>
                    </Link>

                  </div>
                </div>
              </>
            } />
          </Routes>
          <main className="p-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {error && <p className="text-white text-center mb-4">{error}</p>}
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <>
                        <MovieList
                          movies={movies}
                          favourites={favourites}
                          onAddFavourite={addtoFavourite}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePagination}
                        />
                      </>
                    )}
                  </>
                }
              />

              <Route
                path="/movie/:id"
                element={<MovieDetail onAddFavourite={addtoFavourite} />}
              />

              <Route
                path="/favourite"
                element={
                  <Favourite
                    favourites={favourites}
                    onRemoveFavourite={removeFromFavourite}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App