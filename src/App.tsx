import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Search} from "./modules/Search";
import {createStore, action, StoreProvider, Action, Computed, computed, createTypedHooks, debug} from "easy-peasy";
import {Movie} from "./components/MovieCard";

const typedHooks = createTypedHooks<MoviesModel>();


interface MoviesModel {
    movies: Movie[];
    favouritedMovies: Computed<MoviesModel, Movie[]>
    saveMovies: Action<MoviesModel, Movie[]>;
    toggleFavouritedMovie: Action<MoviesModel, Movie>;
}


const store = createStore<MoviesModel>({
    movies: [],
    favouritedMovies: computed((state) => state.movies.filter((movie) => movie.favourited)),
    saveMovies: action((state, movies: Movie[]) => {
        if(!movies) return;
        movies.forEach(movie => {
            const includes = state.movies.map(i => i.imdbID).indexOf(movie.imdbID)
            if (movie.Type === "movie" && includes === -1) {
                state.movies.push(movie)
        }})
        state.movies.sort((a, b) => a.imdbID.localeCompare(b.imdbID))
    }),
    toggleFavouritedMovie: action((state, movie:Movie)=>{
        const index = state.movies.map(i => i.imdbID).indexOf(movie.imdbID)
        state.movies.splice(index, index+1, {
            ...movie,
            favourited: !movie.favourited,
        });
    })
});

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

function App()
{


    return (
    <div className="App">
        <StoreProvider store={store}>
          <Search/>
        </StoreProvider>
    </div>
  );
}

export default App;
