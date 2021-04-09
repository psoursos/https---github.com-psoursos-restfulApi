const express = require('express');

const router = express.Router();

const Movie = require('../models/movies');

//ROUTES
//GET ALL MOVIES
router.get('/', async (req, res) => {
    //res.send('We are on users')
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET MOVIE BY ID
router.get('/:movieId', async (req, res) => {
    try {
        const movies = await Movie.findById(req.params.movieId);
        res.json(movies);
    } catch (err) {
        res.json({ message: err });
    }
});

//SEARCH MOVIE BY TITLE CATEGORY DATE
router.get('/search/:key', async (req, res) => {
    try {
        const movies = await Movie.find(
            {
                $or:
                    [
                        { "category": { "$regex": req.params.key, "$options": "i" } },
                        { "title": { "$regex": req.params.key, "$options": "i" } }
                    ]
            });
        res.json(movies);
    } catch (err) {
        res.json({ message: err });
    }
});


//CREATE MOVIE
router.post('/', async (req, res) => {
    //console.log(req.body);
    const movie = new Movie({
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        cinema_name: req.body.cinema_name,
        category: req.body.category
    });
    try {
        const savedMovie = await movie.save();
        res.status(200).json(savedMovie);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE MOVIE BY ID
router.delete('/:movieId', async (req, res) => {
    //res.send('We are on users')
    try {
        const removedMovie = await Movie.remove({ _id: req.params.movieId });
        res.json(removedMovie);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH MOVIE BY ID
router.patch('/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const patchedMovie = await Movie.updateOne(
            { _id: req.params.userId },
            {
                $set: {
                    title: req.body.title,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    cinema_name: req.body.cinema_name,
                    category: req.body.category
                }
            }
        );
        res.json(patchedMovie);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;