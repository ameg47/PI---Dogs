import Dog from "./Dog";
import image from "../dog.jpeg"

export let asc=function(a, b) {
    var nameA = a.name.toUpperCase(); 
    var nameB = b.name.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
}

export let des=function(b, a) {
    var nameA = a.name.toUpperCase(); 
    var nameB = b.name.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
}

export let wasc=function(a, b) {
  var weightA = a.weight.metric ? average(a.weight.metric): average(a.weight);
  var weightB = b.weight.metric ? average(b.weight.metric): average(b.weight) 
  if (weightA < weightB) {
    return -1;
  }
  if (weightA > weightB) {
    return 1;
  }
  return 0;
}

export let wdes=function(b, a) {
  var weightA = a.weight.metric ? average(a.weight.metric): average(a.weight);
  var weightB = b.weight.metric ? average(b.weight.metric): average(b.weight); 
  if (weightA < weightB) {
    return -1;
  }
  if (weightA > weightB) {
    return 1;
  }
  return 0;
}

export let lifeasc= function(a, b) {
  var lifeA = average(a.life_span) 
  var lifeB = average(b.life_span)
  if (lifeA < lifeB) {
    return -1;
  }
  if (lifeA > lifeB) {
    return 1;
  }
  return 0;
}
function average(weight){
  const weight_num= weight.split(" - ")
  if(weight_num[0]==="NaN"){weight_num[0]=weight_num[1]}
  if(weight==="NaN") {return 0}
  if (weight_num.length>1) {return Math.ceil((parseInt(weight_num[1])+parseInt(weight_num[0]))/2)}
  else return parseInt(weight)
}

export const mapper=(dogs, filt, temp)=>{
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if(filt==="create"){dogs=dogs.filter(e=>regexExp.test(e.id))}
  if(filt==="exist"){dogs=dogs.filter(e=>!regexExp.test(e.id))}
  
  if(temp!=="All"){dogs=dogs.filter(e=>e.temperament ? e.temperament.includes(temp):false)}
  
  return dogs.map(d=>{
    if(d.temperaments){
        let list=""
        d.temperaments.forEach(element => {
            if(element===d.temperaments[0]) list=element.name
            else list=list+", "+element.name
        });
        d.temperament=list
    }
    return (
    <li key={d.id}>
        <Dog key={d.id}
        id={d.id}
        name={d.name}
        img={d.image ? d.image.url:image}
        temp={d.temperament}
        weight={d.weight.metric ? d.weight.metric: d.weight}
        />
    </li>)}
)}