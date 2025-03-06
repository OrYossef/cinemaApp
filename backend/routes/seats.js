const express = require('express');
const Seat = require('../models/Seat');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (error) {
        console.error("Error fetching seats:", error);
        res.status(500).json({ message: 'Error fetching seats' });
    }
});

router.put('/reserve', async (req, res) => {
    try {
        const { seatIds, userId } = req.body;
        const reservedUntil = new Date(Date.now() + 15 * 60 * 1000); // 📌 שמירה ל-15 דקות

        await Seat.updateMany(
            { _id: { $in: seatIds }, isReserved: false }, 
            { isReserved: true, reservedUntil, userId }
        );

        res.json({ success: true, message: "Seats reserved successfully!" });
    } catch (error) {
        console.error("Error reserving seats:", error);
        res.status(500).json({ message: 'Error reserving seats' });
    }
});

router.put('/release', async (req, res) => {
    try {
        const { seatIds, userId } = req.body;

        await Seat.updateMany(
            { _id: { $in: seatIds }, userId },
            { isReserved: false, reservedUntil: null, userId: null }
        );

        res.json({ success: true, message: "Seats released successfully!" });
    } catch (error) {
        console.error("Error releasing seats:", error);
        res.status(500).json({ message: 'Error releasing seats' });
    }
});

module.exports = router;
