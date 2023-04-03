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
        mensaje: "articulo creado con exito",
      });
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        mensaje: "no se pudo guardar",
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
  try {
    let id = req.params.id;
    const articulo = await Articulo.findById(id);

    if (articulo) {
      return res.status(200).json({
        mensaje: "Articulo encontrado",
        articulo,
      });
    } else {
      return res.status(404).json({
        mensaje: "No se encontro ningun archivo con ese id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrio un error al buscar el articulo",
    });
  }
};

const borrar = async (req, res) => {
  try {
    let id = req.params.id;
    const del = await Articulo.deleteOne({ _id: id });

    if (del.deletedCount > 0) {
      return res.status(200).json({
        mensaje: "Articulo eliminado con exito",
        articulo: del,
      });
    } else {
      return res.status(400).json({
        mensaje: "No se pudo encontrar el articulo con ese ID",
      });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error con la busqueda",
    });
  }
};

const actualizar = async (req, res) => {
  try {
    let id = req.params.id;
    let parametros = req.body;

    const art = await Articulo.findOneAndUpdate({ _id: id }, parametros, {
      new: true,
    });
    if (art) {
      return res.status(200).json({
        status: "succes",
        data: art,
        mensaje: "Articulo actualizado con exito",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        mensaje: "No se pudo actualizar un articulo con ese id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Ocurrio un error con la busqueda del articulo a editar",
    });
  }
};

module.exports = {
  prueba,
  probando,
  crear,
  listar,
  uno,
  borrar,
  actualizar,
};
