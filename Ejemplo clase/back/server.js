const app = require("./app");
const connectDatabase = require("./config/database");

//SETEAR EL ARCHIVO DE CONFIGURACION
const dotenv = require("dotenv");
dotenv.config({path: 'back/config/config.env'})

//Configurar base de datos
connectDatabase();


//llamamos al servidor
const server=app.listen(process.env.PORT, ()=>{
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})