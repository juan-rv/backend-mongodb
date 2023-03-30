const { conexion } = require("./database/conexion.js")
const express = require("express");
const cors = require("cors")

//inicializar app
console.log("App de node arrancada")

//conectar a la base de datos:
conexion();

//crear servidor de node
const app = express();
const puerto = 3001

//configurar cors
app.use(cors());

//convertir body a un objeto js
app.use(express.json()); //recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); //permite enviar info en urlencoded


//RUTAS
const rutas_articulo = require('./routes/articulo.js')

//cargo las rutas - todas nos van a nacer despues de /api/

app.use('/api', rutas_articulo)



//crear rutas de prueba/ rutas hardcodeadas 
app.get('/probando', (req, res) => {
    console.log('se ha ejecutado el endpoint probando')
    return res.status(200).send([
        {
            curso: 'master en MERN',
            autor: 'Juan Rodriguez',
            link: 'localhost/3001/probando'
        },
        {
            curso: 'master en REACT',
            autor: 'Juan Rodriguez',
            link: 'localhost/3001/probando2'
        }
    ]
    );
})

app.get('/probando2', (req, res) => {
    return res.status(200).send(`
    <div>
    <h1> Esta es la ruta dos </h1>
    </div>
    `)
})

app.get('/musicos', (req, res) => {
    return res.status(200).send(`
    <div>
    <h2>Esta es la pagina de musicos</h2>
    </div>
    `)
})




//crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("El puerto esta corriendo en el puerto: " + puerto)
})
