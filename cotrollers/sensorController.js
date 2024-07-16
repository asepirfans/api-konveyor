const SensorData = require('../models/sensorModel');

const createSensor = async (req, res) => {
  try {
    const { sensor1, sensor2, sensor3, sensor4} = req.body;
    const newSensorData = {
      sensor1,
      sensor2,
      sensor3,
      sensor4,
    };

    await SensorData.create(newSensorData);

    res.status(201).json({
      success: true,
      statusCode: res.statusCode,
      message: "Data sensor berhasil dibuat",
      data: newSensorData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      statusCode: res.statusCode,
      error: err.message,
    });
  }
};

const getSensors = async (req, res) => {
  try {
    const dataSensor = (await SensorData.find().sort({waktu:-1}).limit(5)).reverse();
    if (!dataSensor) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json(
      {
        success: true,
        statusCode: res.statusCode,
        data: dataSensor,
      }
      );
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

const getSensor = async (req, res) => {
  try {
    const dataSensor = await SensorData.findOne().sort({waktu:-1});
    if (!dataSensor) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json(
      {
        success: true,
        statusCode: res.statusCode,
        data: dataSensor,
      }
      );
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

const countSensor = async (req, res) => {
  try {
    const sensorCounts = await SensorData.aggregate([
      {
        $group: {
          _id: null,
          sensor1Count: { $sum: { $cond: [{ $ifNull: ["$sensor1", false] }, 1, 0] } },
          sensor2Count: { $sum: { $cond: [{ $ifNull: ["$sensor2", false] }, 1, 0] } },
          sensor3Count: { $sum: { $cond: [{ $ifNull: ["$sensor3", false] }, 1, 0] } },
          sensor4Count: { $sum: { $cond: [{ $ifNull: ["$sensor4", false] }, 1, 0] } }
        }
      }
    ]);

    if (!sensorCounts || sensorCounts.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    const counts = sensorCounts[0];
    res.status(200).json({
      success: true,
      statusCode: res.statusCode,
      data: {
        sensor1Count: counts.sensor1Count,
        sensor2Count: counts.sensor2Count,
        sensor3Count: counts.sensor3Count,
        sensor4Count: counts.sensor4Count
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const resetSensorCount = async (req, res) => {
  try {
    // Set semua nilai sensor menjadi 0
    await SensorData.updateMany({}, { $set: { sensor1: 0, sensor2: 0, sensor3: 0, sensor4: 0 } });

    // Hapus semua data dari koleksi
    await SensorData.deleteMany({});

    await SensorData.create({
      sensor1:0,
      sensor2:0,
      sensor3:0,
      sensor4:0,
    })

    res.status(200).json({
      success: true,
      statusCode: res.statusCode,
      message: "Nilai count sensor telah direset kembali ke 0.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




module.exports = { createSensor, getSensors, getSensor, countSensor, resetSensorCount };
