const mongoose = require('mongoose');

const Movie = require('../models/movies');

const cinemasSchema = mongoose.Schema({
    owner: String,
    name: String,
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]


});

module.exports = mongoose.model('Cinema', cinemasSchema)