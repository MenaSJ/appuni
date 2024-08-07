const express = require('express');                                                                                     
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyRoles = require('../middleware/verifyRoles')
const ROLES_LIST = require('../config/roles_list')

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),usuariosController.getUsuarios)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),usuariosController.deleteUsuario);

module.exports = router