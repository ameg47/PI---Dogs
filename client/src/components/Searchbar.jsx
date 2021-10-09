import React, {useState} from "react";
import { getBreedsSearch } from "../actions";
import { useDispatch } from "react-redux";

export default function Searchbar(){
    const [name, setName]= useState("")
    const dispatch= useDispatch();

    const handleInputChange=(e)=>{
        e.preventDefault();
        setName(e.target.value)
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(getBreedsSearch(name));
        setName("")
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input
                type="text"
                id="name"
                placeholder="Breed name"
                value={name}
                onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit">Search</button>
        </form>
    )
}