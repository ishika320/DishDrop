// create server
const express = require('express');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
// Allow frontend origins (add more if you run vite on different ports)
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:5176'];
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); // allow non-browser requests like curl/postman
        if(allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
        return callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) =>{
    res.send("Hello World");
})


app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;
