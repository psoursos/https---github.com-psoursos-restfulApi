const express = require('express');
const router = express.Router();
const Owner = require('../models/owners');


//GET ALL OWNERS
router.get('/', async (req, res) => {
    //res.send('We are on owners')
    try {
        const owners = await Owner.find();
        res.json(owners);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET OWNER BY ID
router.get('/:ownerId', async (req, res) => {
    //res.send('We are on users')
    try {
        const owners = await Owner.findById(req.params.ownerId);
        res.json(owners);
    } catch (err) {
        res.json({ message: err });
    }
});


//CREATE OWNER
router.post('/', async (req, res) => {
    //console.log(req.body);
    const owner = new Owner({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email
    });
    try {
        const savedOwner = await owner.save();
        res.status(200).json(savedOwner);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE OWNER BY ID
router.delete('/:ownerId', async (req, res) => {
    //res.send('We are on owners')
    try {
        const removedOwner = await Owner.remove({ _id: req.params.owner });
        res.json(removedOwner);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH OWNER BY ID
router.patch('/:ownerId', async (req, res) => {
    //res.send('We are on owners')
    try {
        const patchedOwner = await Owner.updateOne(
            { _id: req.params.ownerId },
            {
                $set: {
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email
                }
            }
        );
        res.json(patchedOwner);
    } catch (err) {
        res.json({ message: err });
    }
});


//GET CINEMAS BY OWNER ID
router.get('/cinemas/:ownerId', async (req, res) => {
    //res.send('We are on users')
    try {
        const owners = await Owner.findById(req.params.ownerId)
            .populate({
                path: 'cinemas'
            });
        // console.log(users);
        res.json(owners);
    } catch (err) {
        res.json({ message: err });
        //  console.log(users);
    }
});

//ADD TO CINEMAS BY OWNER ID
router.patch('/cinemas/:ownerId', async (req, res) => {
    //res.send('We are on users')
    try {
        const owners = await Owner.updateOne(
            { _id: req.params.ownerId },
            {
                $push: { cinemas: req.body }
            });
        // console.log(users);
        res.json(owners);
    } catch (err) {
        res.json({ message: err });
        //  console.log(users);
    }
});
//REMOVE FROM CINEMAS BY OWNER ID
router.patch('/cinemas/remove/:ownerId', async (req, res) => {
    //res.send('We are on users')
    try {
        const owners = await Owner.findOneAndUpdate(
            { _id: req.params.ownerId },
            {
                $pull: { cinemas: { $in: [req.body] } }
            });
        // console.log(owners);
        res.json(owners);
    } catch (err) {
        res.json({ message: err });
        //  console.log(users);
    }
});



module.exports = router;