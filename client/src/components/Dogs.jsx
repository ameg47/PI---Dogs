import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { getBreedsAll, getTemps } from "../actions";
import ReactPaginate from "react-paginate";
import { asc, des, wasc, wdes, mapper } from "./functions_F&S";
import "../styles/Dogs.modules.css"

export function Dogs({breeds, temps, getBreedsAll, getTemps}){
    const [pageNumber, setPageNum]= useState(0)
    const [sorted, setSort]= useState("init")
    const [filter, setFilter]= useState("all")
    const [temp, setTemps]= useState("All")

    useEffect(()=>{
        getBreedsAll(); getTemps()},[getBreedsAll, getTemps])
    if(sorted==="init") breeds.sort(asc)

    const handleChangeSort=(e)=> {
        let {value}=e.target
        if(value==="naz") {breeds.sort(asc); setSort(value)}
        if(value==="nza") {breeds.sort(des);setSort(value)}
        if(value==="was") {breeds.sort(wasc); setSort(value)}
        if(value==="wds") {breeds.sort(wdes); setSort(value)}
    }
    
    const handleCheck=(e)=>{
        let {value}=e.target
        if(value==="all"){setFilter(value)}
        if(value==="exist"){setFilter(value)}
        if(value==="create"){setFilter(value)}
    }

    const handleChangeTemp= e=> {setTemps(e.target.value)}

    var listDogs=mapper(breeds, filter, temp)
    
    const dogsperPage=8
    const pageVisited= pageNumber*dogsperPage
    const displayDogs= listDogs.length>8 ? listDogs.slice(pageVisited, pageVisited+dogsperPage) : listDogs
    const changePage= ({selected})=> setPageNum(selected)
    if(displayDogs.length>0){
        return(
        <div className={"container"}>
            <div className={"filterbar"}>
                Sort by:
                <select onChange={handleChangeSort}>
                    <option>-- Select --</option>
                    <option value="naz">Name: A-Z</option>
                    <option value="nza">Name: Z-A</option>
                    <option value="was">Weight average: Ascending</option>
                    <option value="wds">Weight average: Descending</option>
                </select>
                Filter by:
                <select onChange={handleCheck}>
                    <option value="all">All</option>
                    <option value="exist">Existing breeds</option>
                    <option value="create">Created breeds</option>
                </select>
                Temperament:
                    <select name="temp" onChange={handleChangeTemp}>
                        <option value="All">All</option>
                        {temps.map(e=>{
                            return(<option name={e.name} key={e.id} value={e.name}>
                                    {e.name}
                                </option>)
                        })}
                 </select>
                
            </div>
            <div>
                <ReactPaginate 
                   previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount= {Math.ceil(listDogs.length/dogsperPage)}
                    onPageChange={changePage}
                />
                <ul>{displayDogs}</ul>
            </div>
        </div>
    )}
    else{
        return <div>Loading...</div>
    }
}

function mapStateToProps(state){
    return{
        breeds: state.breedList,
        temps: state.temps
    }
}

function mapDispatchToProps(dispatch){
    return {
        getBreedsAll: ()=> dispatch(getBreedsAll()),
        getTemps: ()=> dispatch(getTemps())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dogs);