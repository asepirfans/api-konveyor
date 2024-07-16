const mongoose = require('mongoose');

const speedSchema = new mongoose.Schema({
    rpm : {
        type : Number,
    },

    waktu: {
        type: Date,
        default: Date.now,
      },
})

const Speed = mongoose.model('Speed', speedSchema);

module.exports = Speed;