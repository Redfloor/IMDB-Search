import React from 'react';
import {Button} from "react-bootstrap";

interface Props {
    setSearch: (e: string) => void;
    getSearch: () => void;
}

export const SearchBar = ({setSearch, getSearch}:Props) => {
    return (
        <div className="searchBar">
           <input
               onChange={(e) => {
                   setSearch(e.target.value)
               }}
               //@ts-ignore
               onKeyDown={(e: KeyboardEvent) => {
                   if (e.key === "Enter") {
                       getSearch()
                   }
               }}
           />
           <Button variant="primary" id="search" onClick={getSearch}>Search</Button>
        </div>
    )
}