const mongoose = require('mongoose');

const Movie = require('../models/movies');

const usersSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

module.exports = mongoose.model('User', usersSchema)