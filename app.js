const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Import Routes
const usersController = require('./controllers/UsersController');
app.use('/users', usersController);

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome the nodejs-boilerplate');
});

// Connect to DB 
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('[DB]: connected');
});

console.log(`[App]: is listening on the port: ${process.env.PORT}`);
app.listen(process.env.PORT);
