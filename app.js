// Requerimientos

/*** Requiro la libreria de express*/
const express = require('express');
/**Requiro cors para tener mas seguridad*/
const cors = require('cors');
/** */
const cookieParser = require("cookie-parser")
/**  conectar banco de dados*/
const {dbConnect} = require('./utils/connection')

/**Requiro dotenv para poder acessar las variables de entorno */
require('dotenv').config();

/** */
const app = express();

/**conecto con la BBDD */
dbConnect();

//CORS
app.use(cors());

//COOKIEPARSER
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())


//RUTAS







//Servidor a la escucha 

app.listen(port, () => {
    console.log(`Servidor ON del puerto ${port}`)
});