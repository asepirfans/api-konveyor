const Rpm = require('../models/rpmModel');

const createRpm = async (req, res) => {
    try {
        const {rpm} = req.body;
        await Rpm.create({rpm});

        res.status(201).json({
            success: true,
            statusCode: res.statusCode,
            message: "Data rpm berhasil dibuat",
            data: {rpm},
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          statusCode: res.statusCode,
          error: err.message,
        });
    }
}

const getRpm = async (req, res) => {
    try {
        const rpmData = await Rpm.findOne().sort({waktu:-1});
        if (!rpmData) {
          return  res.status(404).json({
                message: "Data tidak temukan"
            })
        }

        newrpmData = {
            rpm: rpmData.rpm
        }

        res.status(200).json({
            success : true,
            statusCode :res.statusCode,
            data: newrpmData 
        })
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {createRpm, getRpm};