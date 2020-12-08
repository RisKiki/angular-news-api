const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../tools/tools');

const bcrypt    = require('bcrypt');
const UserAdmin = require('../models/user-admin');

const currentRoute = "register";

router.post('', (req, res) => {
    const prop = ['email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserAdmin({
                _id     : new mongoose.Types.ObjectId(),
                name    : req.body.name,
                email   : req.body.email,
                password: hash,
            })

            user
            .save()
            .then(
                (result) => sendSuccess(
                    {
                        _id  : result._id,
                        email: result.email,
                        name : result.name,
                    }, currentRoute, req, res)
            ).catch(
                (err) => sendError(err,currentRoute, req, res)
            );
        })
        .catch(error => res.status(500).json({ error }));
    }
})

module.exports = router;