const mongoose = require('mongoose');


const adminsSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: String,

});

module.exports = mongoose.model('Admin', adminsSchema)