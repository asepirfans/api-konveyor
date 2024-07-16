const express = require('express');
const sensorController = require('../cotrollers/sensorController');
const resetC = require('../cotrollers/resetController');
const router = express.Router();

const verifytoken = require('../middleware/verifytoken');

router.post('/sensor', sensorController.createSensor);
router.get('/sensor', verifytoken, sensorController.getSensor);
router.get('/sensors', verifytoken, sensorController.getSensors);
router.get('/countSensor', verifytoken, sensorController.countSensor);776
// router.put('/reset', sensorController.resetSensorCount);

router.post('/reset', resetC.createReset),
router.get('/reset', resetC.getReset),


module.exports = router;