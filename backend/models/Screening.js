const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    time: { type: String, required: true }, 
    date: { type: String, required: true }, 
    availableSeats: { type: Number, default: 50 },
});

module.exports = mongoose.model('Screening', screeningSchema);
