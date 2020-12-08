const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const {
    checkBody,
    sendMissingProperties,
    sendSuccess,
    sendError
} = require('../tools/tools');

const User = require('../models/user');
const config = require('../config/config');

const currentRoute = "users";

router.post('/create', (req, res) => {
    const prop = ['name','email','password']
    const check = checkBody(prop,req)

    if (!check.valid) {
        sendMissingProperties(check,currentRoute,req,res)
    } else {
        const user = new User({
            _id     : new mongoose.Types.ObjectId(),
            name    : req.body.name,
            email   : req.body.email,
            password: req.body.password,
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
                    if (user.password !== req.body.password) {
                        const err = new Error('Password does not match.');
                        err.status = 401;
                        sendError(err,currentRoute, req, res)
                    } else {
                        sendSuccess(user, currentRoute, req, res)
                    }
                }
            }
        ).catch(
            (err) => sendError(err,currentRoute, req, res)
        );
    }
})

module.exports = router;