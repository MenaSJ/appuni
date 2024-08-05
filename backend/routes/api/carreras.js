const express = require('express');
const router = express.Router();
const carrerasController = require('../../controllers/carrerasController');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .get(carrerasController.getCarreras)
    .post(carrerasController.createCarrera)
    .put(carrerasController.updateCarrera)
    .delete(carrerasController.deleteCarrera);

module.exports = router