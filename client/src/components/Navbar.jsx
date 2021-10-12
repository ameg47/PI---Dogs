import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useDispatch } from "react-redux";
import { getBreedsAll } from "../actions";
import "../styles/Navbar.modules.css"

export default function Navbar(props){
    const dispatch= useDispatch()
    const {match: {url}} = props;
    console.log(url)
    return(
        <nav>
            <div className={"contleft"}>
                <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="" className={"icon"}/>
                <div>
                <Link to="/dogs" onClick={()=>dispatch(getBreedsAll())} className={"link"}>
                    <span className={"navbtn"}>Home</span>
                </Link>
                </div>
                <div>
                <Link to="/add" className={"link"}>
                    <span className={"navbtn"}>Add breed</span>
                </Link>
                </div>
            </div>
            {url==="/dogs" ? (<div className={"searchbar"}>
                <Searchbar />
            </div>):null}
        </nav>
    )
}