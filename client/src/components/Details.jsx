import React, {useEffect} from "react";
import { getBreedDetail, cleanDet } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

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
        <div>
            <h3>{det.name}</h3>
            <img src={det.image ? det.image.url:"https://lh3.googleusercontent.com/proxy/PkwyqfERC9fA7dFO52j7FPakxpu2jVk90q-jx-HXhCr8SJ0RVWI__ZcEgteID5CwruEKvpTO9Uj47IZEq1GUf7IvrlhEhm0"} alt="" width="250" height="250"/>
            <p>{det.weight.metric ? det.weight.metric:det.weight} kg</p>
            <p>{det.height.metric ? det.height.metric:det.height} cm</p>
            <p>{det.life_span}</p>
            <p>{typeof(det.temperament)==="string" ? det.temperament : listT()}</p>
        </div>

    )}
    //else if (det) return <div>{det}</div>
    return <div>Loading...</div>
}