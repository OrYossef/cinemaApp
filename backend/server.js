const express= require('express');
const cors= require('cors');
require('dotenv').config();
const connectDB= require('./config');

const app= express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req,res)=>{
    res.send ('Cinema booking API is running');
});

const Seat = require('./models/Seat'); 

const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const seatRoutes = require('./routes/seats');
app.use('/seats', seatRoutes);

const screeningRoutes = require('./routes/screenings');
app.use('/screenings', screeningRoutes);

const PORT= process.env.PORT || 5000;
app.listen (PORT, ()=> console.log(`server is running on port ${PORT}`));

const releaseExpiredSeats = async () => {
    try {
        await Seat.updateMany(
            { reservedUntil: { $lt: new Date() } },
            { isReserved: false, reservedUntil: null, userId: null }
        );
        console.log("catch seates released ");
    } catch (error) {
        console.error(" Error releasing expired seats:", error);
    }
};

//checking every 60 seconds if there are seats to release
setInterval(releaseExpiredSeats, 60 * 1000);



