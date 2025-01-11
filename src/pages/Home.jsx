//Display multiple movies and search for them
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    // name of the state variable and the function to update the state variable
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //useEffect allows you to perform side effects in function components to define when the side effect should run
    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch (err) {
                console.error(err);
                setError("Failed to load movies :(");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])   // useEffect takes a function as an argument

    const handleSearch = async(e) =>{
        e.preventDefault(); // prevent the default form submission so the page doesn't reload

        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.error(err)
            setError("Failed to search for movies :(")
        } finally {
            setLoading(false)
        }
        
        // setSearchQuery(""); // clear the search query after the alert
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies...." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // updating the value of the searchQuery state variable
                    />
                <button type="submit" className="search-button">Search</button>
            </form>
            
            {error && <div className="error-message">{error}</div>}


            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery) && 
                    <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
            
        </div>
    );
}

export default Home;