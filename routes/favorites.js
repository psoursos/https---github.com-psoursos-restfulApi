const express = require('express');

const router = express.Router();
const User = require('../models/users');


//ROUTES
router.get('/', (req, res) => {
    res.send('We are on favorites')
});

//GET FAVORITES BY USER ID
router.get('/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const users = await User.findById(req.params.userId)
            .populate({
                path: 'favorites'
            });
        // console.log(users);
        res.json(users);
    } catch (err) {
        res.json({ message: err });
        //  console.log(users);
    }
});

//ADD TO FAVORITES BY USER ID
router.patch('/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const users = await User.updateOne(
            { _id: req.params.userId },
            {
                $push: { favorites: req.body }
            });
        // console.log(users);
        res.json(users);
    } catch (err) {
        res.json({ message: err });
        //  console.log(users);
    }
});
//ADD TO FAVORITES BY USER ID
router.patch('/remove/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const users = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $pull: { favorites: { $in: [req.body] } }
            });
        // console.log(users);
        res.json(users);
    } catch (err) {
        res.json({ message: err });
        //  console.log(users);
    }
});

module.exports = router;