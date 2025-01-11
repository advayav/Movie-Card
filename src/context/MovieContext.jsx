import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

//children is a special prop that gets passed to components automatically
//basically whatever is passed inside the component will be the children
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    //local storage is a way to store data from the browser

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        if (storedFavs) {
            // storing as JSON in local storages since it can only store strings and when we want to read it we convert it from JSON to JS object(array in this case)
            setFavorites(JSON.parse(storedFavs));
        }
    }, [])

    useEffect(() => {
        //converting it to a string here so that it can be stored in the local storage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    const addToFavorites = (movie) => {
        //...prev allows us to just add the new movie to the list of movies that was already in the favorites
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
        //new array with all the movies except the one that was clicked because filter just filters out the movie that was clicked on
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        //checks if the movie id we are passing in is in the favorites array
        return favorites.some(movie => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}