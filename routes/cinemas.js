const express = require('express');

const router = express.Router();

const Cinema = require('../models/cinemas');

//ROUTES
//GET ALL cinemas
router.get('/', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const cinemas = await Cinema.find();
        res.json(cinemas);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET CINEMA BY ID
router.get('/:cinamaId', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const cinemas = await Cinema.findById(req.params.cinamaId);
        res.json(cinemas);
    } catch (err) {
        res.json({ message: err });
    }
});


//CREATE CINEMA
router.post('/', async (req, res) => {
    //console.log(req.body);
    const cinema = new Cinema({
        name: req.body.name,
        owner: req.body.owner
    });
    try {
        const savedCinema = await cinema.save();
        res.status(200).json(savedCinema);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE CINEMA BY ID
router.delete('/:cinamaId', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const removedCinema = await Cinema.remove({ _id: req.params.cinamaId });
        res.json(removedCinema);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH CINEMA BY ID
router.patch('/:cinemaId', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const patchedCinema = await Cinema.updateOne(
            { _id: req.params.cinemaId },
            {
                $set: {
                    name: req.body.name,
                    owner: req.body.owner
                }
            }
        );
        res.json(patchedCinema);
    } catch (err) {
        res.json({ message: err });
    }
});

//GET MOVIES BY CINEMA ID
router.get('/movies/:cinemaId', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const cinemas = await Cinema.findById(req.params.cinemaId)
            .populate({
                path: 'movies'
            });
        // console.log(cinemas);
        res.json(cinemas);
    } catch (err) {
        res.json({ message: err });
        //  console.log(cinemas);
    }
});

//ADD TO MOVIES BY CINEMA ID
router.patch('/movies/:cinemaId', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const cinemas = await Cinema.updateOne(
            { _id: req.params.cinemaId },
            {
                $push: { movies: req.body }
            });
        // console.log(cinemas);
        res.json(cinemas);
    } catch (err) {
        res.json({ message: err });
        //  console.log(cinemas);
    }
});
//REMOVE FROM MOVIES BY CINEMA ID
router.patch('/movies/remove/:cinemaId', async (req, res) => {
    //res.send('We are on cinemas')
    try {
        const cinemas = await Cinema.findOneAndUpdate(
            { _id: req.params.cinemaId },
            {
                $pull: { movies: { $in: [req.body] } }
            });
        // console.log(cinemas);
        res.json(cinemas);
    } catch (err) {
        res.json({ message: err });
        //  console.log(cinemas);
    }
});



module.exports = router;