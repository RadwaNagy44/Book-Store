require('dotenv').config();
const express = require('express');
const app = express();
const {ERROR} = require('./utils/httpStatusText');
const mongoose = require('mongoose');
const storeRoutes = require('./routes/storeRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const url = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use('/api/store', storeRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(url).then( () => {
    console.log('connected to database');
})
//Global Middleware for not found routes
app.all('*', (req,res) => {
    return res.status(404).json({status: ERROR, message: 'Resource not found'});
})
//Global Middleware for error handling
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({status: err.statusText || ERROR, message: err.message, code: err.statusCode || 500, data: null});
})
app.listen(process.env.PORT, () => {
    console.log('listening on port '+ process.env.PORT);
})