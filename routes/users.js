const express = require('express');

const router = express.Router();
const User = require('../models/users');


//ROUTES
//GET ALL USERS
router.get('/', async (req, res) => {
    //res.send('We are on users')
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET USER BY ID
router.get('/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const users = await User.findById(req.params.userId);
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});


//CREATE USER
router.post('/', async (req, res) => {
    //console.log(req.body);
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email
    });
    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE USER BY ID
router.delete('/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH USER BY ID
router.patch('/:userId', async (req, res) => {
    //res.send('We are on users')
    try {
        const patchedUser = await User.updateOne(
            { _id: req.params.userId },
            {
                $set: {
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email
                }
            }
        );
        res.json(patchedUser);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;