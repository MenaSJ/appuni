const express = require('express');
const router = express.Router();
const recoverController = require('../controllers/recoverController');

router.post('/recover', recoverController.recoverPassword);
router.post('/recover/:token', recoverController.resetPassword);

module.exports = router;
