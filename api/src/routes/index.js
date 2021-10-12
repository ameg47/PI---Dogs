const { Router } = require('express');
const axios= require("axios")
require('dotenv').config();
const {API_KEY}=process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temperament}= require("../db.js")

const router = Router();

// Configurar los routers
router.get("/dogs", async (req,res)=>{
    let {name}= req.query
    if(name){
        name=name.charAt(0).toUpperCase()+ name.slice(1);
        try{
            const list=[]
            const dogs= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            for(elem of dogs.data){
                if(elem.name.includes(name))list.push(elem)
            }
            const dog= await Dog.findOne({where:{name},include:Temperament});
            if(dog) list.push(dog)
            if(list.length>0) return res.send(list)
            else return res.send("Breed not found")
        }catch(e){
            console.log(e)
        }
    }
    const list=[]
    
    const dogsapi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    for(elem of dogsapi.data) list.push(elem)
    
    const dogsdb= await Dog.findAll({
        include:Temperament
      });
    for(elem of dogsdb) list.push(elem)
    res.send(list)
})

router.get("/dogs/:id", async(req,res)=>{
    const id= req.params.id
    try{
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        if(regexExp.test(id)){
            const dog= await Dog.findByPk(id,{
                include:Temperament
              })
            if(dog) return res.send(dog)
        }

        const dogs= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        for(elem of dogs.data){
            if (elem.id===parseInt(id)) return res.json(elem)
        }
        res.json("Breed details not found")
    }catch(e){
        console.log(e)
    }
})

router.get("/temperament", async (req,res)=>{
    const temperaments= await Temperament.findAll();
    res.json(temperaments)
})

router.post("/dog", async (req, res)=>{
    const {name, height_min, height_max, weight_min, weight_max, lifespan_min, lifespan_max, temp}= req.body
    
    try{
        const [dog, created]= await Dog.findOrCreate({
            where: {
                name:name,
                height:`${height_min} - ${height_max}`,
                weight:`${weight_min} - ${weight_max}`,
                life_span:`${lifespan_min} - ${lifespan_max} years`
            }
        })
        await dog.addTemperaments(temp)
        res.send(dog)
    }catch(e){
        console.log(e)
    }
})

module.exports = router;
