require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const axios= require("axios")
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  //logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

const getTemp =() => axios.get("https://api.thedogapi.com/v1/breeds?api_key=02621b66-92e0-42db-a89a-bca7ba8fb178")
  .then(async r=>{
      for(el of r.data){
          if(el.temperament){
          const temps=el.temperament.split(", ")
          for(i=0; i<temps.length; i++){
              try{
                  await Temperament.findOrCreate({where:{name:temps[i]}})
              }catch(e){
                  console.log(e)
              }
          }}
      }
  })
async function checker(){
  const tabletemp= await Temperament.findByPk(1)
  if(tabletemp===null) {getTemp()}
}

checker()

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temperament, {through:"dog_temperament"})
Temperament.belongsToMany(Dog, {through:"dog_temperament"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
