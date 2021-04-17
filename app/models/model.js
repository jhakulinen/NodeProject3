const mongoose = require("mongoose");

const MusicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Music", MusicSchema);