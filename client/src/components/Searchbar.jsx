import React, {useState} from "react";
import { getBreedsSearch } from "../actions";
import { useDispatch } from "react-redux";
import "../styles/Searchbar.modules.css"

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
                className={"insrc"}
            />
            <button type="submit" className={"btnsrc"}>Search</button>
        </form>
    )
}