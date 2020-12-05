const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../tools/tools');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const config = require('../config/config');

const currentRoute = "users";

router.post('/create', (req, res) => {
    const prop = ['name','email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
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

router.post('/login', (req, res) => {
    const prop = ['email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        User.findOne()
        .where({
            email:req.body.email,
        })
        .then(
            (user) => {
                if (!user){
                    const err = new Error('Login does not exists');
                    err.status = 401;
                    sendError(err,currentRoute, req, res)
                } else {
                    bcrypt.compare(req.body.password, user.password)
                    .then(
                        (valid) => {
                            if (!valid) {
                                const err = new Error('Password does not match.');
                                err.status = 401;
                                sendError(err,currentRoute, req, res)
                            } else {
                                const data = {
                                    token: jwt.sign(
                                        { userId: user._id },
                                        config.secretToken
                                    )
                                }
                                sendSuccess(data, currentRoute, req, res)
                            }
                        }
                    )
                }
            }
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }
})

module.exports = router;