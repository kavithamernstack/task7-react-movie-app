import axios from 'axios';

const API_KEY = "51fcb98b";
const API_URL = "https://www.omdbapi.com/";

//searchMovie

export const SearchMovie = async (searchTerm, type = "") => {
    try{
        const response = await axios.get(`${API_URL}?s=${searchTerm}&type=${type}&apikey=${API_KEY}`);
         return response.data
    } catch (error) {
        console.log("Error fetching the movies")
    }
}

// movie details

export const MovieDetails = async (id) => {
    try{
        const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
        //  console.log("API Response:", response); 
        return response.data
    } catch (error) {
        console.log("Error fetching the movies")
    }
}