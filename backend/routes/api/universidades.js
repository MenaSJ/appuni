const express = require('express');
const router = express.Router();
const universidadesController = require('../../controllers/universidadesController');
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(universidadesController.getUniversidades)
    .post(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), universidadesController.createUniversidad)
    .put(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), universidadesController.updateUniversidad)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), universidadesController.deleteUniversidad)
    
router.route('/search')
        .get(universidadesController.getUniversidad);
        
router.route('/:id')
    .get(universidadesController.getUniversidadById);

module.exports = router