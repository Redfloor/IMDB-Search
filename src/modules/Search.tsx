import React, {useState} from 'react';
import {SearchBar} from "../components/SearchBar";
import {Results} from "../components/Results";
import {Favourites} from "./Favourites";
import {useStoreActions, useStoreState} from "../App";

export const Search = () => {
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showFavourites, setShowFavourites] = useState(false)
    const saveMovies = useStoreActions((actions) => actions.saveMovies);
    const movies = useStoreState((state) => state.movies)
    const favourites = useStoreState(state=>state.favouritedMovies)
    const getSearch=() => {
        setShowFavourites(false)
        if(isLoading) {
            return;
        }
        setIsLoading(true)
        fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${search}&page=1&r=json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": "cef84d9a71msh90a9ff42a3f785ap13bb4ejsn6923269826b3"
            }
        })
            .then(response => {
                return response.json()
            }).then(response => {
            saveMovies(response.Search)
            setIsLoading(false)
            }

        )
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="container">
            <div className="nav">
                <SearchBar
                    setSearch={setSearch}
                    getSearch={getSearch}
                />
                <Favourites
                    setShow={() => setShowFavourites(true)}
                />
            </div>
            <Results
                search={search}
                movies={showFavourites ? favourites : movies}
                isLoading={isLoading}
            />
        </div>
    )
}