const mongoose = require("mongoose");

const conexion = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mi_blog")
        //parametros dentro de objeto; solo en caso de un aviso
        //useNewUrlParser : true
        //newUnifieldTopology: true
        //useCreateIndex:true

        console.log("Ya estamos conectado correctamente a la base de datos: mi_blog!!")
    } catch (error) {
        console.log(error);
        throw new Error ("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    conexion
}