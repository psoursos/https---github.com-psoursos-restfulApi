const express = require('express');
const mongoose = new require('mongoose');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
//Middlewares
//app.use(auth);
//app.use('/users', () => {
//    console.log('middle');
//});
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const app = express();
app.use(bodyParser.json());

//Import Routes
const usersRoute = require('./routes/users');
const ownersRoute = require('./routes/owners');
const adminsRoute = require('./routes/admins');
const moviesRoute = require('./routes/movies');
const cinemasRoute = require('./routes/cinemas');
const favoritesRoute = require('./routes/favorites');
//const cinemasMoviesRoute = require('./routes/favorites');
//const ownersCinemasRoute = require('./routes/favorites');




app.use('/admins', adminsRoute);
app.use('/users', usersRoute);
app.use('/owners', ownersRoute);
app.use('/movies', moviesRoute);
app.use('/cinemas', cinemasRoute);
app.use('/users/favorites', favoritesRoute);
//app.use('/owners/cinemas', favoritesAddRoute);
//app.use('/cinemas/movies', favoritesAddRoute);
//ROUTES
app.get('/home', (req, res) => {
    res.send('We are on home')
});


//Listen to Server
app.listen(3000, console.log("Listenning.."))

//Connect to Db
//For container change localhost to container name mymdb-mongodb
mongoose
    .connect(
        "mongodb://mongo-mymdb:27017/mymdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
// .then(() => console.log('connected to db!'))
// .catch(err => console.log(err));
//db.on('error'.console.error.bind(console,))
mongoose.connection
    .once('open', () => console.log('connected to db!'))
    .on('error', (error) => {
        console.log("Unable to connect ", error);
    });
