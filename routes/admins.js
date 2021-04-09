const express = require('express');

const router = express.Router();

const Admin = require('../models/admins');

//ROUTES
//GET ALL ADMINS
router.get('/', async (req, res) => {
    //res.send('We are on admins')
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET ADMIN BY ID
router.get('/:adminId', async (req, res) => {
    //res.send('We are on admins')
    try {
        const admins = await Admin.findById(req.params.adminId);
        res.json(admins);
    } catch (err) {
        res.json({ message: err });
    }
});


//CREATE ADMIN
router.post('/', async (req, res) => {
    //console.log(req.body);
    const admin = new Admin({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email
    });
    try {
        const savedAdmin = await admin.save();
        res.status(200).json(savedAdmin);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE ADMIN BY ID
router.delete('/:adminId', async (req, res) => {
    //res.send('We are on admins')
    try {
        const removedAdmin = await Admin.remove({ _id: req.params.adminId });
        res.json(removedAdmin);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH ADMIN BY ID
router.patch('/:adminId', async (req, res) => {
    //res.send('We are on admins')
    try {
        const patchedAdmin = await Admin.updateOne(
            { _id: req.params.adminId },
            {
                $set: {
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email
                }
            }
        );
        res.json(patchedAdmin);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;