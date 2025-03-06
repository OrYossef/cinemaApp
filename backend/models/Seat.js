const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    screeningId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screening' },
    row: Number,
    col: Number,
    price: Number,
    isReserved: { type: Boolean, default: false }, 
    reservedUntil: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } 
});

module.exports = mongoose.model('Seat', seatSchema);
