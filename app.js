// Requerimientos

/*** Requiro la libreria de express*/
const express = require('express');
/**Requiro cors para tener mas seguridad*/
const cors = require('cors');
/** */
const cookieParser = require("cookie-parser")
/**  conectar banco de dados*/
const {dbConnect} = require('./utils/connection')
/** */
const bodyParser = require('body-parser');

/**Requiro dotenv para poder acessar las variables de entorno */
require('dotenv').config();

/** */
const app = express();

//PORT
const port = process.env.PORT

/**conecto con la BBDD */
dbConnect();

//CORS
app.use(cors({   
        origin: 'http://localhost:8000', // La ruta del front
        credentials: true, // Permite o uso de cookies
}));

//COOKIEPARSER
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())


//RUTAS

app.use("/api/v1/news", require("./routes/newsRoutes"));

app.use("/api/v1/users", require("./routes/userRoutes"));








//Servidor a la escucha 

app.listen(port, () => {
    console.log(`Servidor ON del puerto ${port}`)
});