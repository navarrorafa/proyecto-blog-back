/** Requerimiento de Mongoose */
const mongoose = require('mongoose');

/**
 * Función que se encarga de conectar a la base de datos utilizando Mongoose.
 * @async
 * @function dbConnect para conectar la base de datos
 * @returns {Promise<object>} Devulve una promesa informando si el servidor fue conectado o no. 
 */
const dbConnect = async () => {
    try {
        
        const res = await mongoose.connect(process.env.URI_DB);
        
        console.log('Conectado a la bbdd')
        return res
    } catch (error) {
        
        return {
            ok: false,
            msg: 'Error al conectar la bbdd'
        };
    };
};


/** 
 * Exporta la función dbConnect el archivo app.js para hacer la conexion con el servidor.
*/
module.exports = { dbConnect };