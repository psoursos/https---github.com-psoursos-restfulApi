const mongoose = require('mongoose');

const Cinema = require('../models/cinemas');

const ownersSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    cinemas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cinema'
        }
    ]
});

module.exports = mongoose.model('Owner', ownersSchema)