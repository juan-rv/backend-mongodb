const express = require("express");
const router = express.Router();

//controlador
const ArticuloController = require("../controladores/articulo");

//rutas de pruebas

router.get("/rutas-de-prueba", ArticuloController.prueba);
router.get("/probando", ArticuloController.probando);

//ruta de creacion
router.post("/crear", ArticuloController.crear);

//ruta traer datos de la bd
router.get("/articulos/:ultimos?", ArticuloController.listar);

//traer uno
router.get("/articulo/:id", ArticuloController.uno);

module.exports = router;
