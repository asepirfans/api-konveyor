const resetButton = require('../models/resetModel');

const createReset = async (req, res) => {
    try {
        const {button} = req.body;
        await resetButton.create({button});

        res.status(201).json({
            success: true,
            statusCode: res.statusCode,
            message: "Data reset berhasil dibuat",
            data: {button},
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

const getReset = async (req, res) => {
    try {
        const resetData = await resetButton.findOne().sort({waktu:-1});
        if (!resetData) {
          return  res.status(404).json({
                message: "Data tidak temukan"
            })
        }

        newResetData = {
            button: resetData.button
        }

        res.status(200).json({
            success : true,
            statusCode :res.statusCode,
            data: newResetData 
        })
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {createReset, getReset};