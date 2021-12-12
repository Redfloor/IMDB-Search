import * as React from 'react';
import {Button, Image} from "react-bootstrap";
import {FavoriteBorder, Favorite} from '@mui/icons-material';
import {useStoreActions} from "../App";

export interface Movie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
    favourited: boolean;
}

interface Props {
    movie: Movie;
}

export const MovieCard = ({movie}: Props) => {
    const  {Poster, Title, Type, favourited, imdbID, Year} = movie;
    const toggleFavourite = useStoreActions(actions => actions.toggleFavouritedMovie)

    return (<div className="movie" id={imdbID}>
        <Image src={Poster} rounded />
        <div className="info">
            <h1 className="title">{Title}</h1>
            <h2 className="type">{Type}</h2>
            <h3 className="year">{Year}</h3>
            <Button
                className={favourited ? "favouriteRemove" : "favouriteAdd"}
                onClick={()=>toggleFavourite(movie)}
            >
                {favourited ? "Remove From Favourites" : "Add To Favourites"}
                {favourited ? <Favorite/> : <FavoriteBorder/>}
            </Button>
        </div>
    </div>)
}