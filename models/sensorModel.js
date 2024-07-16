const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  sensor1: {
    type: Number,
  },
  sensor2: {
    type: Number,
  },
  sensor3: {
    type: Number,
  },
  sensor4: {
    type: Number,
  },
  waktu: {
    type: Date,
    default: Date.now,
  },
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
