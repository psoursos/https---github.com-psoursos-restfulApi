const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
    title: String,
    cinema_name: String,
    category: String,
    start_date: Date,
    end_date: Date,


});

module.exports = mongoose.model('Movie', moviesSchema)