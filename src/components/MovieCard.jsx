import '../css/MovieCard.css';
import { useMovieContext } from '../context/MovieContext';
//Component to display a movie card
function MovieCard({movie}) {
    //getting all the state we need from useMovieContext
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        //className is used to add css classes to the element
        //Do not use class like in HTML since it is a reserved keyword in javascript
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                {/* it's like taking the first char from a string cause it's splitting the date and taking only the year once the date splits it just becomes one long string so 2024-11-28 would just be 20241128 */}
            </div>
        </div>
    );
}

export default MovieCard;