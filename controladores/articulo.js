const validator = require("validator");
const Articulo = require("../models/Articulo.js");

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en el controlador de articulos",
  });
};

const probando = (req, res) => {
  return res.status(200).json([
    {
      curso: "master en MERN",
      autor: "Juan Rodriguez",
      link: "localhost/3001/probando",
    },
    {
      curso: "master en REACT",
      autor: "Juan Rodriguez",
      link: "localhost/3001/probando2",
    },
  ]);
};

const crear = (req, res) => {
  //recoger los parametros por post a guardar
  let parametros = req.body;

  //validar los datos; libreria validator
  //que no esten vacios
  try {
    let validar_titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: 30 });
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_contenido) {
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos",
    });
  }

  //crear el objeto a guardar
  const articulo = new Articulo(parametros);

  //asignar valores a objeto en el modelo (manual o automatico)
  //articulo.titulo = parametros.titulo

  //guardar el articulo en la base de datos

  articulo.save().then(() => {
    try {
      return res.status(200).json({
        status: "succes",
        parametros: articulo,
        mensaje: "artioculo creado con exito",
      });
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        mensaje: "Perdiste el anio",
      });
    }
  });
};

const listar = async (req, res) => {
  let lista = await Articulo.find({}).sort({ fecha: -1 });

  if (req.params.ultimos) {
    let lista = await Articulo.find({}).limit(3);
    return res.status(200).json({
      status: "succes",
      contador: lista.length,
      lista,
    });
  }

  if (!lista) {
    return res.status(404).json({
      status: "fail",
      mensaje: "No se puede traer la informacion de la base de datos",
    });
  }
  return res.status(200).send({
    status: "succes",
    parametro: req.params.ultimos,
    contador: lista.length,
    lista,
  });
};

const uno = async (req, res) => {
  //recoger un id por la url
  let id = req.params.id;
  //buscar el articulo por el metodo findOne
  let lista = await Articulo.findById(id);
  //si no existe devolver error]
  if (!lista) {
    return res.status(404).json({
      mensaje: "no existe un articulo con ese id ",
    });
  }
  return res.status(200).json({
    mensaje: "succes",
    lista,
  });
  //si existe devuelve el resultado
};

module.exports = {
  prueba,
  probando,
  crear,
  listar,
  uno,
};
