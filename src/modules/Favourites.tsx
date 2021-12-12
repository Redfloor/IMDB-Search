import React from 'react'
import {Button} from "react-bootstrap";

interface Props {
    setShow: () => void;
}

export const Favourites = ({setShow}: Props) => {
    return (
        <Button variant="primary" onClick={setShow}>Favourites</Button>
    )
}