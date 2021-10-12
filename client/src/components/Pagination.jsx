import React from 'react';
import "../styles/Pagination.modules.css"

export default function Pagination({dogsperPage, total, pagination, currentPage}) {
    const pageNums = [];

    for(let i = 1; i <= Math.ceil(total / dogsperPage); i++) {
        pageNums.push(i);
    }

    const handleClick= (e)=>{
        const value= e.target.name
        if(value==="prev"){
            if(currentPage>0)pagination(currentPage-1)
        }
        if(value==="next"){
            if(currentPage<Math.floor(total / dogsperPage))pagination(currentPage+1)
        }
    }
    
    return (
        <div className={"pagination"}>
            <button name="prev" onClick={handleClick} className={"prevnext"}>Previous</button>
            <ul className={"paginationBtns"}>
                {pageNums.map(num => {
                    return <button className={"num"} onClick={() => pagination(num-1)} key={num}>{num}</button>;
                })}
            </ul>
            <button name="next" onClick={handleClick} className={"prevnext"}>Next</button>
        </div>
    )
}