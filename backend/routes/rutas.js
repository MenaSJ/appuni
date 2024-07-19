const express = require('express');
const router = express.Router();
const universidadesController = require('../controllers/universidadesController');
const carrerasController = require('../controllers/carrerasController');
const favoritosController = require('../controllers/favoritosController');
const reportesController = require('../controllers/reportesController');
const usuariosController = require('../controllers/usuariosController');
const comentariosController = require('../controllers/comentariosController');

router.get('/universidades', universidadesController.getUniversidades);
router.get('/carreras/:universidadID', carrerasController.getCarreras);
// Rutas para favoritos
router.post('/favoritos', favoritosController.agregarFavorito);
router.delete('/favoritos/:favoritoID', favoritosController.eliminarFavorito);

// Ruta para eliminar un reporte
router.delete('/reportes/:reporteID', reportesController.eliminarReporte);

// Ruta para actualizar la contraseña
router.put('/usuarios/:usuarioID/contrasena', usuariosController.actualizarContrasena);

// Rutas para comentarios
router.post('/comentarios', comentariosController.agregarComentario);
router.delete('/comentarios/:comentarioID', comentariosController.eliminarComentario);

// Ruta para crear la tabla de comentarios
router.post('/create-comentarios-table', comentariosController.createComentariosTable);

// Rutas para crear tablas de reporte
router.post('/create-reportes-table', reportesController.createReportesTable);
// Rutas para crear tablas de reporte
router.post('/create-favoritos-table', favoritosController.createFavoritosTable);

module.exports = router;
