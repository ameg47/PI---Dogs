import React, {useState, useEffect} from "react";
import { getTemps } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Add.modules.css"

export default function Add(){
    const dispatch= useDispatch()
    const [input, setInput]= useState({
        name:"",
        height_min:null,
        height_max:null,
        weight_min:null,
        weight_max:null,
        lifespan_min:null,
        lifespan_max:null,
        temp:[]
    })
    function handleChange(e){
        const {value, name}=e.target
        
        if(name!=="temp"){
            setInput({
                ...input,
                [name]:value
        })}
        else{
            if(!input.temp.includes(value)){
                setInput({
                  ...input,
                  [name]: [...input[name], value]
            })}
        }
    }

    function handleClick(e){
        e.preventDefault();
        const {name}=e.target
        setInput({
            ...input,
            temp:input.temp.filter(e=> e!==name)
      })
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch("http://localhost:3001/dog", {
            method:"POST", 
            body: JSON.stringify( input ),
            headers:{
                'Content-Type': 'application/json'
              }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        alert("Breed added!");
    }

    useEffect(()=>{dispatch(getTemps())},[dispatch])
    const temps= useSelector((state)=> state.temps)
    return(
        <div className={"formcont"}>
            <h2>Add Breed</h2>
            <form onSubmit={handleSubmit} className={"form"}>
                <div className={"divel"}>Name: <input type="text" 
                    name="name" 
                    value={input.name} 
                    onChange={handleChange} required/></div>
                <div className={"divel"}>
                    Height: <input type="number"
                    name="height_min"
                    min="1"
                    max="200"
                    onChange={handleChange} required 
                    className={"inptnum"}/>-
                    <input type="number"
                    name="height_max"
                    min={input.height_min}
                    max="200"
                    onChange={handleChange} required 
                    className={"inptnum"}/> cm
                </div>
                <div className={"divel"}>
                    Weight: <input type="number"
                    name="weight_min"
                    min="1"
                    max="100"
                    onChange={handleChange} required className={"inptnum"}/>-
                    <input type="number"
                    name="weight_max"
                    min={input.weight_min}
                    max="100"
                    onChange={handleChange} required className={"inptnum"}/> kg
                </div>
                <div className={"divel"}>
                    Life span: <input type="number"
                    name="lifespan_min"
                    min="1"
                    max="30"
                    onChange={handleChange} required
                    className={"inptnum"}/>-
                    <input type="number"
                    name="lifespan_max"
                    min={input.lifespan_min}
                    max="30"
                    onChange={handleChange} required
                    className={"inptnum"}/> years
                </div>
                <div className={"divel"}>Temperament: <select name="temp" onChange={handleChange}>
                        {temps && temps.map(e=>{
                            return(<option name={e.name} key={e.id} value={e.id}>
                                {e.name}
                                </option>)
                        })}
                    </select>
                    <ul className={"listtemps"}>
                    {input.temp.length>0 && input.temp.map(e=>{
                        return(
                            <li key={e} className={"eltemp"}>
                                {temps.find(el=>el.id===parseInt(e)).name} 
                                <button name={e} onClick={handleClick} className={"lbtn"}> X</button>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                <input type="submit" value="Add Breed" className={"btnsub"}/>
            </form>
        </div>
    )
}