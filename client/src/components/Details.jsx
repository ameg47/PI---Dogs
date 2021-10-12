import React, {useEffect} from "react";
import { getBreedDetail, cleanDet } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../styles/Details.modules.css"
import image from "../dog.jpeg"

export default function Details(){
    const dispatch=useDispatch()
    const {id}= useParams()

    useEffect(()=>{dispatch(getBreedDetail(id))
        return function cleanup() {
            dispatch(cleanDet())
        };
    },[dispatch, id])
    
    let det= useSelector((state)=> state.breedDetail)
    const listT=()=>{
        let list=""
        det.temperaments.forEach(element => {
            if(element===det.temperaments[0]) list=element.name
            else list=list+", "+element.name
        });
         return list
    }

    if(det.name){
    return(
        <div className={"detcont"}>
            <div className={"infoconta"}>
                <h3>{det.name}</h3>
                <p>Weight: {det.weight.metric ? det.weight.metric:det.weight} kg</p>
                <p>Height: {det.height.metric ? det.height.metric:det.height} cm</p>
                <p>Life span: {det.life_span}</p>
                <p>Temperament: {typeof(det.temperament)==="string" ? det.temperament : listT()}</p>
            </div>
            <div className={"imgcont"}>
                <img src={det.image ? det.image.url:image} alt="" className={"detimg"}/>
            </div>
        </div>

    )}
    //else if (det) return <div>{det}</div>
    return <div className={"loading"}>Loading...</div>
}