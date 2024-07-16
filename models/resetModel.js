const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    button : {
        type : String,
    },
    waktu: {
        type: Date,
        default: Date.now,
      },
})

const ResetButton = mongoose.model('Reset', resetSchema) ;

module.exports = ResetButton;