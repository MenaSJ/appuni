const express = require('express');
const router = express.Router();
const recoverController = require('../controllers/recoverController');

router.post('/', recoverController.recoverPassword);
router.post('/:token', recoverController.resetPassword);

module.exports = router;
