import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dog.modules.css"

export default function Dog(props){
    return (
        <Link to={`/dogs/${props.id}`} className={"link"}>
        <div className={"card"}>
            <h4 className={"dogname"}>{props.name}</h4>
            <img src={props.img} alt="" className={"imgcard"}/>
            {/* <p>{props.weight} kg</p>
            <p>{props.temp}</p> */}
            
        </div>
        </Link>
    )
}