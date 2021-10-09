export const GET_BREEDS_ALL= "GET_BREEDS_ALL"
export const GET_BREEDS_SEARCH= "GET_BREEDS_SEARCH"
export const GET_BREED_DETAIL= "GET_BREED_DETAIL"
export const GET_TEMPS= "GET_TEMPS"
export const CLEANDET= "CLEANDET"

export function getBreedsAll(){
    return function (dispatch){
        return fetch("http://localhost:3001/dogs")
            .then(r=>r.json())
            .then(json=>{dispatch({type:GET_BREEDS_ALL, payload:json})})
    }
}

export function getBreedsSearch(name){
    return function (dispatch){
        return fetch(`http://localhost:3001/dogs?name=${name}`)
            .then(r=>r.json())
            .then(json=>{dispatch({type:GET_BREEDS_SEARCH, payload:json})})
    }
}

export function getBreedDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/dogs/${id}`)
            .then(r=>r.json())
            .then(json=>{dispatch({type:GET_BREED_DETAIL, payload:json})})
    }
}

export function getTemps(){
    return function(dispatch){
        return fetch(`http://localhost:3001/temperament`)
            .then(r=>r.json())
            .then(json=>{dispatch({type:GET_TEMPS, 
                payload:json.sort(function(a, b) {
                    var nameA = a.name.toUpperCase(); 
                    var nameB = b.name.toUpperCase(); 
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                })
            })})
    }
}

export function cleanDet(){ 
    return { type: CLEANDET
         };
}

