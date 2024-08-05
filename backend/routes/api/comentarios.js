const express = require('express');
const router = express.Router();
const comentarioController = require('../../controllers/comentariosController');
const ROLES_LIST = require('../../config/roles_list');
const verifyJWT = require('../../middleware/verifyJWT');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(comentarioController.agregarComentario)
    .get(comentarioController.getComentariosUniversidadID)
    // .put(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),comentarioController.actualizarComentario)
    .delete(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),comentarioController.eliminarComentario);

module.exports = router