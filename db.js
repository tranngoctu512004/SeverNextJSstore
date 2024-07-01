const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URL;

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB: ' + err);
    });
