import * as React from 'react'
import {MovieCard, Movie} from "./MovieCard";
import {Spinner} from "react-bootstrap";

interface Props {
    search: string;
    movies: Movie[];
    isLoading: boolean
}

export const Results = ({movies, isLoading}: Props) => {
    if (movies === []) return <></>
    if (isLoading) return (
        <div className="loading">
            <Spinner animation="border" variant="light" >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
    return (
            <div className="results">
                {movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID}/>)}
            </div>
    )
}