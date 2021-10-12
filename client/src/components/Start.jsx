import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import { getBreedsAll } from "../actions";
import { useDispatch } from "react-redux";
import "../styles/Start.modules.css"

export function Start() {
    const dispatch= useDispatch();
    const handleClick=()=>{dispatch(getBreedsAll())}
    return(
        <div className={"startcont"}>
            <div className={"startdiv"}>
                <h1 className={"startTitle"}>Welcome to the Dog Database</h1>
                <div>
                <Link to="/dogs"><button onClick={handleClick} className={"btn"}>START</button></Link>
                </div>
            </div>
            <div className={"startdiv"}>
                <img className={"imgstart"} src="https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
        </div>
        
    )
}


export default connect()(Start);