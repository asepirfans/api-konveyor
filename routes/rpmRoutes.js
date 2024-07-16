const express = require('express')
const rpmC = require('../cotrollers/rpmController');
const router = express.Router();

router.post('/rpm', rpmC.createRpm),
router.get('/rpm', rpmC.getRpm),

module.exports = router;