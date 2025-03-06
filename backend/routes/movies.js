const express= require('express');
const axios= require('axios');
const router= express.Router();
require('dotenv').config();

const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = process.env.TMDB_API_KEY;

let moviesCache= [];

const fetchMovies = async () => {
    try {
        console.log("Fetching movies from TMDb API...");
        const response = await axios.get(`${TMDB_API_URL}?api_key=${API_KEY}&language=he-IL&page=1`);
        
        if (!response.data || !response.data.results) {
            throw new Error("TMDb API response is invalid");
        }

        moviesCache = response.data.results.slice(0, 10).map(movie => ({
            id: movie.id,
            title: movie.title,
            description: movie.overview || "No description available",
            duration: movie.runtime || 120,
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            rating: movie.vote_average || "N/A",
            genre_ids: movie.genre_ids || []
        }));

        console.log(" Movies successfully loaded into cache!");
    } catch (error) {
        console.error(" ERROR - problem with loading the movies into the array:", error.message);
    }
};

fetchMovies();

router.get('/', (req,res)=>{
    if (moviesCache.length === 0) {
        return res.status(500).json({ error: "No movies available. Please try again later." });
    }
    res.json(moviesCache);
});

router.get('/refresh', async (req, res) => {
    await fetchMovies(); 
    res.json({ message: 'movies were updated', movies: moviesCache });
});

module.exports= router;