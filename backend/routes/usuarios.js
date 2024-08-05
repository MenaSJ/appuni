const express = require('express');                                                                                     
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.route('/')
    .get(usuariosController.getUsuarios)
    .delete(usuariosController.deleteUsuario);

module.exports = router