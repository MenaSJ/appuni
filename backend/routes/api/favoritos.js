const express = require('express');
const router = express.Router();
const favoritosController = require('../../controllers/favoritosController');

router.route('/')
    .get(favoritosController.obtenerFavoritos)
    .post(favoritosController.agregarFavorito)
    // .put(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),comentarioController.actualizarComentario)
    .delete(favoritosController.eliminarFavorito);

module.exports = router