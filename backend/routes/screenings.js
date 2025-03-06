const express = require('express');
const router = express.Router();
const Screening = require('../models/Screening');
const mongoose= require('mongoose');


router.get('/:movieId', async (req, res) => {
    try {
        console.log("Received movieId:", req.params.movieId); 

        const movieId = new mongoose.Types.ObjectId(req.params.movieId);

        const screenings = await Screening.find({ movieId });

        res.json(screenings);
    } catch (error) {
        console.error("Error fetching screenings:", error);
        res.status(500).json({ success: false, message: "Error fetching screenings" });
    }
});



router.post('/add', async (req, res) => {
    try {
        const { movieId, time, date } = req.body;
        const newScreening = new Screening({ movieId, time, date, availableSeats: 50 });
        await newScreening.save();
        res.json({ success: true, message: "Screening added successfully!" });
    } catch (error) {
        console.error(" Error adding screening:", error);
        res.status(500).json({ success: false, message: "Error adding screening" });
    }
});

module.exports = router;
