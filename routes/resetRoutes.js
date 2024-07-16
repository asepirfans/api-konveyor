const express = require('express')
const resetC = require('../cotrollers/resetController');
const router = express.Router();

router.post('/reset', resetC.resetB),
router.get('/reset', resetC.getReset),

module.exports = router;