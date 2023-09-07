/**requiro el Schema de moongose para crear el modelo de la base */
const { Schema, model } = require("mongoose");

const newsSchema = new Schema({
    title:{
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    resume : {
        type: String ,
        require: true ,
        min: 5 ,
        max: 100
    },
    text: {
        type: String,
        require: true,
        min: 20,
        max: 500
    },
    Author: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model ("New", newsSchema);



